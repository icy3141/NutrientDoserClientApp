

class CommandData {

    /**@type {number}*/
    Type;

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

    /**use instead of string.split
     * @param {string} spaceDelimited
     **/
    static getSpaceDelimitedStringsWithQuotes(spaceDelimited) {
        //dont split if space is between ""
        let segments = [];
        let segment;
        let spaceInd;
        let quoteInd;
        let loop = true;
        //BROKEN
        //DOES NOT WORK
        //YOU ARE HIGH
        //FIX THIS BEFORE RUNNING THE CODE
        while (loop) {
            spaceInd = spaceDelimited.indexOf(' ');
            quoteInd = spaceDelimited.indexOf('"');
            if (spaceInd == -1)
                spaceInd = spaceDelimited.length;

            if (spaceInd < quoteInd || quoteInd == -1) {
                segment = spaceDelimited.substring(0, spaceInd);
                spaceDelimited = spaceDelimited.substring(spaceInd, spaceDelimited.length - spaceInd);
            }



            segments.push(segment);

            loop = spaceInd < spaceDelimited.length;
        }
    }
    /**use instead of string.split
     * @param {string} spaceDelimited
     **/
    static getSpaceDelimitedStrings(spaceDelimited) {
        //dont split if space is after \
        let segments = [];
        let segment;
        let spaceInd;
        let quoteInd;
        let loop = true;
        //BROKEN
        //DOES NOT WORK
        //YOU ARE HIGH
        //FIX THIS BEFORE RUNNING THE CODE
        while (loop) {
            spaceInd = spaceDelimited.indexOf('\0');
            quoteInd = spaceDelimited.indexOf('"');
            if (spaceInd == -1)
                spaceInd = spaceDelimited.length;

            if (spaceInd < quoteInd || quoteInd == -1) {
                segment = spaceDelimited.substring(0, spaceInd);
                spaceDelimited = spaceDelimited.substring(spaceInd, spaceDelimited.length - spaceInd);
            }



            segments.push(segment);

            loop = spaceInd < spaceDelimited.length;
        }
    }

    /** builds the command object from server message text (space delimited)
     * @param {string} spaceDelimited
     * @return {CommandData}
     */
    static parse(spaceDelimited) {
        /**@type {string[]}*/
        //let segments = getSpaceDelimitedStrings(spaceDelimited);
        let segments = spaceDelimited.split(DELIMITTER);
        if (segments.length < 1) return CommandData.Empty();

        //if there is only a type
        /**@type {string} */
        let typeStr = segments[0];
        /**@type {number} */
        let type = tryParseNumberString(typeStr);

        let isBadData = Number.isNaN(type);
        if (isBadData)
            return CommandData.Empty();
        if (segments.length == 1) return new CommandData(type);

        //if there are any arguments
        let args = new Array(segments.length - 1);
        for (let i = 1; i < segments.length; i++) {
            args[i - 1] = tryParseNumberOrObject(segments[i]);
        }
        let command = new CommandData(type);
        command.setArgumentList(args);
        return command;
    }

    toString() {
        let str = this.Type + (this.Arguments.length > 0 ? DELIMITTER : "");
        for (let i = 0; i < this.Arguments.length; i++) {
            let arg = this.Arguments[i];
            if (typeof arg == "boolean")
                str += (arg ? 1 : 0);
            else if (typeof (arg) == "string")
                str += prepareString(arg);
            else
                str += arg;
            str += (i < this.Arguments.length - 1 ? DELIMITTER : "");
        }
        return str;
    }
    //toString() {
    //    return JSON.stringify(this);
    //}


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
let DELIMITTER = String.fromCharCode(31);
function unwrapString(wrappedStr) {
    let unwrapped = wrappedStr;
    //if (typeof (wrappedStr) == "string" && wrappedStr.length >= 2 &&
    //    wrappedStr.startsWith('"') && wrappedStr.endsWith('"')) {
    //    unwrapped = wrappedStr.substring(1, wrappedStr.length - 1);

    //    //replace
    //    unwrapped = unwrapped.replace("\\" + "\"", "\"");
    //}
    return unwrapped;
}
/**
 * @param {string} stringToParse
 * @returns {number}
 * */
function tryParseNumberOrObject(someObject) {
    if (typeof (someObject) == "string") {
        if (someObject.includes('"'))
            return unwrapString(someObject);
        let num = tryParseNumberString(someObject);
        if (!Number.isNaN(num))
            return num;
    }
    return someObject;
}
/**
 * @param {string} stringToParse
 * @returns {number}
 * */
function tryParseNumberString(stringToParse) {
    let num = Number.NaN;
    if (stringToParse.includes(".")) {
        try {
            num = Number.parseFloat(stringToParse);
        }
        catch (e) { }
    }
    else {
        try {
            num = Number.parseInt(stringToParse);
        }
        catch (e) { }
    }
    return num;
}