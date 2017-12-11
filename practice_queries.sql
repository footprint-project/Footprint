
//Get all info about one particular footprint:
//can probably remove the living.id and shipping.id and travel.id

SELECT "hotel", "fuel", "grid", "propane", "air", "truck", "sea", "plane", "car", "train", "living"."id" as living_id, "shipping"."id" as shipping_id, "travel"."id" as travel_id, "travel"."footprint_id" as footprint_id FROM "living" JOIN "shipping" ON "living"."footprint_id" = "shipping"."footprint_id" JOIN "travel" ON "living"."footprint_id" = "travel"."footprint_id" WHERE "travel"."footprint_id"=8;

//Get all info including sums for one footprint:

SELECT "hotel", "fuel", "grid", "propane", "air", "truck", "sea", "plane", "car", "train", "travel"."footprint_id" as footprint_id, "hotel" + "fuel" + "grid" + "propane" as living_total, "air" + "truck" + "sea" as shipping_total, "car" + "plane" + "train" as travel_total FROM "living" JOIN "shipping" ON "living"."footprint_id" = "shipping"."footprint_id" JOIN "travel" ON "living"."footprint_id" = "travel"."footprint_id" WHERE "travel"."footprint_id"=8;

//Grab category totals for all footprints associated with one project:

SELECT "period", "project_id", "hotel" + "fuel" + "grid" + "propane" as living_total, "air"+ "truck"+ "sea" as shipping_total, "plane"+ "car"+ "train" as travel_total, "footprints"."id" as footprint_id FROM "footprints" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "project_id"=7;




//Get all a users projects (and footprints for them) ordered by period (for now testing with user_id=2) --- home page line graph:

SELECT "period", "project_id", "hotel" + "fuel" + "grid" + "propane" as living_total, "air"+ "truck"+ "sea" as shipping_total, "plane"+ "car"+ "train" as travel_total, "footprints"."id" as footprint_id, "projects"."user_id" as user_id FROM "projects" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "user_id"=2 ORDER BY "period";

//Get category totals for all users projects -- home page pie chart:

SELECT SUM("hotel" + "fuel" + "grid" + "propane") as living_total, SUM("air"+ "truck"+ "sea") as shipping_total, SUM("plane"+ "car"+ "train") as travel_total FROM "projects" JOIN "footprints" ON "projects"."id" = "footprints"."project_id" JOIN "living" ON "footprints"."id" = "living"."footprint_id" JOIN "shipping" ON "footprints"."id" = "shipping"."footprint_id" JOIN "travel" ON "footprints"."id"= "travel"."footprint_id" WHERE "user_id"=2;
