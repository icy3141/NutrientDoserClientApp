
//enum for command types
const CommandType =
{
    /*reserve up to 9 for system functions*/
    /// <summary>
    /// command not recognized
    /// </summary>
    Unrecognized: 0,
    /// <summary>
    /// ping the other side of the connection
    /// </summary>
    Ping: 1,
    /// <summary>
    /// response to a ping
    /// </summary>
    PingResponse: 2,
    /// <summary>
    /// stop doing something
    /// </summary>
    Abort: 3,
    /// <summary>
    /// reset the device
    /// </summary>
    Reset: 3,

    /*reserve up to 19 for pump functions*/

    /// <summary>
    /// turn a pump on or off
    /// params: bool isOn
    /// </summary>
    SetPump: 10,
    /// <summary>
    /// pump an amount of fluid
    /// params: double amount, string unit
    /// </summary>
    PumpAmount: 11,
    /// <summary>
    /// turn a pump on for an amount of time
    /// params: double seconds
    /// </summary>
    PumpTime: 12,
    /// <summary>
    /// start calibrating pump
    /// params: double seconds
    /// </summary>
    PumpCalibrateStart: 13,
    //a command to signify end of pump calibration
    PumpCalibrateEnd: 14,

    /// <summary>
    /// a request for recipe data
    /// </summary>
    RecipeRequest: 20,
    /// <summary>
    /// the data for a recipe
    /// </summary>
    Recipe: 21


};
