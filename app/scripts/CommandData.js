

class CommandData {

    /**@type {number}*/
    Type = 0;

    /**@type {Array}*/
    Arguments = [];

    constructor(typeOfCommand) {
        this.Type = typeOfCommand;
        let args = [...arguments];
        args.shift();
        this.setArgumentList(args);
    }
    setArgumentList(argumentsList) {
        this.Arguments = argumentsList;
    }
    setArguments() {
        this.Arguments = [...arguments];
    }

    getArg(i) {
        return this.Arguments[i];
    }

    static Empty() {
        return new CommandData(CommandType.Unrecognized);
    }

    send(webSocket) {
        if (!webSocket)
            webSocket = socket;
        webSocket.send(this.toString());
    }


    /** builds the command object from server message text (space delimited)
     * @param {string} spaceDelimited
     * @return {CommandData}
     */
    static parse(jsonString) {
        /**@type {string[]}*/
        
        return command;
    }

    toString() {
        return JSON.stringify(this);
    }


    prepareString(rawStr) {
        /**@type {String}*/
        preppedStr = rawStr;
        //add escape character to inner quotes
        //preppedStr = preppedStr.replace("\"", "\\" + "\"");

        //surround with quotes
        //preppedStr = `"${preppedStr}\"`;
        return preppedStr;
    }
}