/**
 * Calls underlying function and returns its result.  
 * If interval after last call hasn't been finished yet, returns last result
 * @template {any[]} T
 * @template R
 * @template {(...args: T) => Promise<R>} F
 */
export default class{
    #interval
    #fn
    #last
    #initialized
    #intervalRunning
    /**
     * @arg {F} fn
     * @arg {number} interval
     */
    constructor(fn, interval){
        this.#fn = fn;
        this.#interval = interval;
    }
    /**
     * @arg {T} args
     * @return {Promise<R>}
     */
    async call(...args){
        if(this.#intervalRunning && this.#initialized) return this.#last;
        this.#intervalRunning = true;
        setTimeout(() => { this.#intervalRunning = false }, this.#interval);
        this.#last = await this.#fn(...args);
        this.#initialized = true;
        return this.#last;
    }
}
