class Recipe extends Map{

    /**@type {string}*/
    currentFluid = "";

    currentIndex = 0;

    next() {
        this.currentIndex++;
        this.updateCurrentFluid();
    }

    updateCurrentFluid()
    {
        if (this.hasCurrent())
            this.currentFluid = this.getFluids()[this.currentIndex];
    }

    hasCurrent() {
        return this.currentIndex < this.size;
    }

    hasNext() {
        return this.currentIndex < this.size - 1;
    }

    getFluids() {
        return [...this.keys()];
    }

    /**parse recipe data from incoming command
     * */
    static parse(command) {
        let recipe = new Recipe();
        for (let i = 0; i < command.Arguments.length; i+=2) {
            recipe.set(command.getArg(i), command.getArg(i + 1));

        }
        recipe.updateCurrentFluid();
        return recipe;
    }
    


}