/**
 * Calls underlying function and returns its result.  
 * If interval after last call hasn't been finished yet, returns last result
 */
export default class{
    #interval
    #fn
    #last
    #initialized
    #intervalRunning
    constructor(fn, interval){
        this.#fn = fn;
        this.#interval = interval;
        return (...args) => this.#call(...args);
    }
    async #call(...args){
        if(this.#intervalRunning && this.#initialized) return this.#last;
        this.#intervalRunning = true;
        this.#initialized = true;
        this.#last = this.#fn(...args);
        try{
            const res = await this.#last;
            setTimeout(() => { this.#intervalRunning = false }, this.#interval);
            return res;
        } catch(e){
            this.#intervalRunning = false;
            throw e;
        }
    }
}
