

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
        if (!webSocket) return;
        webSocket.send(this.toString());
    }

    /** builds the command object from server message text
     * @param {string} jsonString
     * @return {CommandData}
     */
    static parse(jsonString) {
        let jsonObj = JSON.parse(jsonString);
        let command = new CommandData(jsonObj.Type);
        command.setArgumentList(jsonObj.Arguments);
        return command;
    }
    /** 
     * 
     */
    toString() {
        return JSON.stringify(this);
    }
}