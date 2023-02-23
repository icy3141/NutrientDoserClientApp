
//enum for command types
CommandType = {
	/*reserve up to 9 for system functions*/
	/// <summary>
	/// command not recognized
	/// </summary>
	Unrecognized : 0,
	/// <summary>
	/// ping the other side of the connection
	/// </summary>
	Ping : 1,
	/// <summary>
	/// response to a command, the next parameter will be the command responded to
	/// args: CommandType respondingTo, bool succeeded
	/// </summary>
	Response : 2,
	/// <summary>
	/// stop doing something
	/// </summary>
	Abort : 3,
	/// <summary>
	/// reset the device
	/// </summary>
	Reset : 4,
	ConfigData: 5,

	/*reserve up to 19 for pump functions*/

	/// <summary>
	/// turn a pump on or off
	/// args: bool isOn
	/// </summary>
	SetPump : 10,
	/// <summary>
	/// pump an amount of fluid
	/// args: FluidAmount amountToPump
	/// </summary>
	PumpAmount : 11,
	/// <summary>
	/// turn a pump on for an amount of time
	/// args: double seconds
	/// </summary>
	PumpTime : 12,
	/// <summary>
	/// Start calibrating pump for a given fluid.
	/// args: string fluidName, double seconds
	/// </summary>
	PumpCalibrateStart : 13,
	/// <summary>
	/// notifies end of pump calibration (when the pump turns off)
	/// args: none
	/// </summary>
	PumpCalibrateEnd : 14,
	/// <summary>
	/// Provide the server with user input about the actual measured quantity.
	/// args: string fluidName, FluidAmount amountMeasured
	/// </summary>
	PumpCalibrateActualVolume : 15,


	/// <summary>
	/// the data for a recipe
	/// </summary>
	RecipeRequest : 20,
	Recipe : 21,



}


loadCounter++;
