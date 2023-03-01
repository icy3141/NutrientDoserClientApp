
/** The units available to represent FluidAmounts. */
const FluidUnit =
{
	None: 0,
	//Metric
	Milliliters: 1,
	Liters: 2,

	//Imperial
	Gallons: 20,
	Quarts: 21,
	Cups: 22,

	//Spoons
	Teaspoons: 40,
	Tablespoons: 41,

	//Weight
	Grams: 50,
	Milligrams: 51,
	Kilograms: 52

}
function isWeightUnit() {
	switch (unit) {
		//Weight
		case FluidUnit.Grams: return true;
		case FluidUnit.Milligrams: return true;
		case FluidUnit.Kilograms: return true;
		default: return false;
	}
}
function isVolumeUnit(unit) {
	switch (unit) {
		//Metric
		case FluidUnit.Liters: return true;
		case FluidUnit.Milliliters: return true;

		//Imperial
		case FluidUnit.Gallons: return true;
		case FluidUnit.Quarts: return true;
		case FluidUnit.Cups: return true;

		//Spoons
		case FluidUnit.Teaspoons: return true;
		case FluidUnit.Tablespoons: return true;
		default: return false;
	}
}
function getUnitAbbreviation(unit) {
	switch (unit) {
		//Weight
		case FluidUnit.Grams: return "g";
		case FluidUnit.Milligrams: return "mg";
		case FluidUnit.Kilograms: return "kg";

		//Metric
		case FluidUnit.Liters: return "L";
		case FluidUnit.Milliliters: return "mL";

		//Imperial
		case FluidUnit.Gallons: return "gal";
		case FluidUnit.Quarts: return "qt";
		case FluidUnit.Cups: return "C";

		//Spoons
		case FluidUnit.Teaspoons: return "tsp";
		case FluidUnit.Tablespoons: return "Tbsp";
		default: return "";
	}
}
class FluidAmount {
	/**
	 * @type {string}
	 */
	Name = "";
	/**
	 * @type {number}
	 */
	Value = 0;
	/** 
	 * @type {number}
	 */
	Unit = FluidUnit.Milliliters;
	/** 
	 * @type {number}
	 */
	RateUnit = FluidUnit.None;

	constructor(value, unit = 1, name = "") {
		this.Name = name;
		this.Value = value;
		this.Unit = unit;
	}
}



loadCounter++;