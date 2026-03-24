import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Blob "mo:core/Blob";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import UserApproval "user-approval/approval";
import MixinStorage "blob-storage/Mixin";

actor {
  type BoothId = Nat;
  type StallId = Nat;
  var nextBoothId : BoothId = 0;
  var nextStallId : StallId = 0;

  type FstId = Nat;
  type Event = {
    id : FstId;
    name : Text;
    description : Text;
    location : Text;
    date : Int;
    capacity : Nat;
    organizer : Principal;
    registrationFee : Nat; // Event entry/participation fee if paid event
    reservedBy : ?Principal; // principal of the person that reserved the event
    isSingleDay : Bool;
    startTime : Int;
    endTime : Int;
    attendees : [Principal]; // Initial empty attendees - to be modified during registration.
    eventType : BookableEventType;
  };

  /// # Reserved attribute represents the status of whether a entity (event, booth, or stall) is currently reserved by a principal.
  type Reserved = {
    #reserved : Principal; // principal of the person that reserved the entity
    #unreserved;
  };

  // Use extended variant for different types of bookable events
  type BookableEventType = {
    #startupPitch;
    #workshopSession;
    #panelDiscussion;
    #networkingEvent;
    #conferenceTalk;
    #other : Text;
  };

  let bookableEvents = Map.empty<FstId, Event>();

  type Booth = {
    id : BoothId;
    name : Text;
    reservedBy : Reserved; // Represents reservation status and principal if reserved
    location : Text;
    businessType : BoothType;
    price : Nat;
    area : Nat; // Size of the booth area
    timeLimit : ?Int; // Time limit for reservation (if any)
    reservedUntil : ?Int; // End reservation timestamp
    owner : Principal; // The principal ID of the owner
  };

  // Add the businessType field to the Booth type
  type BoothType = {
    #tech : BoothTechType;
    #retail : BoothRetailType;
    #food : BoothFoodType;
    #other : Text;
  };

  type BoothTechType = {
    #startup;
    #techHardware;
    #devTools;
    #fintech;
    #education;
    #hardwareRental;
  };

  type BoothRetailType = {
    #clothing;
    #handmadeCrafts;
    #art;
    #traditionalProducts;
    #jewelry;
    #furniture;
    #books;
    #electronics;
    #sportsEquipment;
    #stationery;
  };

  type BoothFoodType = {
    #restaurant;
    #streetFood;
    #snacks;
    #foodTrucks;
    #organic;
    #beverages;
  };

  let booths = Map.empty<BoothId, Booth>();

  // Make prices explicit for different stall types.
  type Stall = {
    id : StallId;
    name : Text;
    description : Text;
    businessCategory : Text; // e.g. "Handmade Crafts", "Art", "Clothing", "Street Food"
    location : Text;
    timeLimit : ?Int; // Time limit for reservation (if any)
    reservedBy : Reserved; // Uses the 'Reserved' variant type
    price : Nat;
    area : Nat; // Size of the stall area
    reservedUntil : ?Int;
    images : [Blob];
    owner : Principal; // The principal ID of the owner
    stallType : StallType;
  };

  type StallType = {
    #artsAndCrafts;
    #foodAndDrink;
    #cultural;
    #clothing;
    #usedItems;
    #other;
  };

  // Costs for different types of booths
  let boothTypeCosts : [(BoothType, Nat)] = [
    (
      #retail(#clothing),
      75_000_000,
    ),
    (
      #retail(#handmadeCrafts),
      75_000_000,
    ),
    (
      #retail(#art),
      75_000_000,
    ),
    (
      #retail(#traditionalProducts),
      80_000_000,
    ),
    (
      #retail(#jewelry),
      90_000_000,
    ),
    (
      #retail(#furniture),
      60_000_000,
    ),
    (
      #retail(#books),
      70_000_000,
    ),
    (
      #retail(#electronics),
      80_000_000,
    ),
    (
      #retail(#sportsEquipment),
      70_000_000,
    ),
    (
      #retail(#stationery),
      70_000_000,
    ),
    (
      #tech(#startup),
      100_000_000,
    ),
    (
      #tech(#techHardware),
      100_000_000,
    ),
    (
      #tech(#devTools),
      95_000_000,
    ),
    (
      #tech(#fintech),
      110_000_000,
    ),
    (
      #tech(#education),
      105_000_000,
    ),
    (
      #tech(#hardwareRental),
      80_000_000,
    ),
    (
      #food(#restaurant),
      45_000_000,
    ),
    (
      #food(#streetFood),
      70_000_000,
    ),
    (
      #food(#snacks),
      80_000_000,
    ),
    (
      #food(#foodTrucks),
      100_000_000,
    ),
    (
      #food(#organic),
      120_000_000,
    ),
    (
      #food(#beverages),
      75_000_000,
    ),
  ];

  // Function to filter flyers by business type.
  public query ({ caller }) func filterBoothsByType(boothType : BoothType) : async [Booth] {
    // CONSIDER - all guests can view flyers + business type
    booths.values().toArray().filter(func(booth) { booth.businessType == boothType });
  };

  let tileSize : Nat = 1; // Define a constant tile size for simplicity

  // Buildings (mapped by IDs) and map initialization.
  type Building = {
    id : Nat;
    name : Text;
    x : Nat;
    y : Nat;
    width : Nat;
    height : Nat;
  };

  let buildings = Map.empty<Nat, Building>();
  let initialized : Bool = false;
  let gridSize : Nat = 400; // 40m x 40m grid

  // User Profile Management
  public type UserProfile = {
    businessName : Text;
    name : Text;
    image : ?Text;
    email : ?Text;
    phone : ?Text;
    description : ?Text;
  };

  public type Person = {
    id : Principal;
    name : Text;
    profileType : ProfileType;
    image : ?Text;
    email : ?Text;
    phone : ?Text;
  };

  public type ProfileType = {
    #visitor;
    #vendor;
    #organizer;
    #admin;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Approval logic
  let accessControlState = AccessControl.initState();
  let approvalState = UserApproval.initState(accessControlState);
  include MixinAuthorization(accessControlState);

  // Storage logic
  include MixinStorage();

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller) or true;
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // Upload user profile.
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  public type Flyer = {
    id : Text;
    bookableEvent : Storage.ExternalBlob; // Reference to bookable events
    name : Text;
  };

  public query ({ caller }) func getBuildingByCoordinates(x : Nat, y : Nat) : async ?Building {
    // Use for loop, so we can return early when finding a match.
    var found : ?Building = null;
    for ((_, building) in buildings.entries()) {
      if (x >= building.x and x < (building.x + building.width)) {
        if (y >= building.y and y < (building.y + building.height)) {
          found := ?building;
        };
      };
    };
    found;
  };
};
