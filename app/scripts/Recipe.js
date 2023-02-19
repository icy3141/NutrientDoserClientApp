class Recipe{

    /**@type {string}*/
    currentFluid = "";

    currentIndex = 0;

    /**@type {string}*/
    Name;

    /**@type {Map<string, any>}*/
    Fluids;
    /**@type {any[]}*/
    FluidList;
    DurationWeeks;
    TargetPh;
    EcTarget;
    

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
        return this.currentIndex < this.Fluids.size - 1;
    }

    getFluids() {
        return [...this.Fluids.keys()];
    }

    /**parse recipe data from incoming json
     * @param {object} recipeJsonObj pre-parsed json object, expected to be C# recipe
     * */
    static parse(recipeJsonObj) {
        let recipe = new Recipe();
        for (let propertyName in recipeJsonObj) {
            recipe[propertyName] = recipeJsonObj[propertyName];
        }
        recipe.unpackFromJson();
        recipe.updateCurrentFluid();
        return recipe;
    }

    unpackFromJson() {
        this.Fluids = new Map();
        for (let fluid of this.FluidList) {
            this.Fluids.set(fluid.Name, fluid);
        }
        this.FluidList = null;
    }

    toJson() {
        return JSON.stringify(this);
    }
    


}