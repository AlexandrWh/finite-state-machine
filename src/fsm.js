class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    if(config === undefined){
    		throw new Error();
    }
    		this.config = config;
    		this.activeState = 'normal';
    		this.previosState = [];
    		this.counter = 0;
    		this.max = 0;
    		//this.previosState = 'normal';
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    		return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    		switch (state){
    				case 'normal': this.previosState[this.counter] = this.activeState; this.activeState = 'normal'; 
    				if(this.max == this.counter){ this.max++; this.counter++; } else { this.counter++; this.max = this.counter } 
    				this.previosState[this.counter] = this.activeState;break;
    				case 'busy': this.previosState[this.counter] = this.activeState; this.activeState = 'busy'; 
    				if(this.max == this.counter){ this.max++; this.counter++; } else { this.counter++; this.max = this.counter } 
    				this.previosState[this.counter] = this.activeState;break;
    				case 'sleeping': this.previosState[this.counter] = this.activeState; this.activeState = 'sleeping'; 
    				if(this.max == this.counter){ this.max++; this.counter++; } else { this.counter++; this.max = this.counter } 
    				this.previosState[this.counter] = this.activeState;break;
    				case 'hungry': this.previosState[this.counter] = this.activeState; this.activeState = 'hungry';
    				if(this.max == this.counter){ this.max++; this.counter++; } else { this.counter++; this.max = this.counter } 
    				this.previosState[this.counter] = this.activeState;break;
    				default: throw new (Error);
    		}
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    		switch(event){
    				case 'study': this.previosState[this.counter] = this.activeState; this.activeState = 'busy'; 
    				if(this.max == this.counter){ this.max++; this.counter++; } else { this.counter++; this.max = this.counter }
    				this.previosState[this.counter] = this.activeState;break;
    				case 'get_tired': this.previosState[this.counter] = this.activeState; this.activeState = 'sleeping'; 
    				if(this.max == this.counter){ this.max++; this.counter++; } else { this.counter++; this.max = this.counter }
    				this.previosState[this.counter] = this.activeState;break;
    				case 'get_up': this.previosState[this.counter] = this.activeState; this.activeState = 'normal'; 
    				if(this.max == this.counter){ this.max++; this.counter++; } else { this.counter++; this.max = this.counter }
    				this.previosState[this.counter] = this.activeState;break;
    				case 'get_hungry': this.previosState[this.counter] = this.activeState;this.activeState = 'hungry'; 
    				if(this.max == this.counter){ this.max++; this.counter++; } else { this.counter++; this.max = this.counter }
    				this.previosState[this.counter] = this.activeState;break;
    				case 'eat': this.previosState[this.counter] = this.activeState; this.activeState = 'normal'; 
    				if(this.max == this.counter){ this.max++; this.counter++; } else { this.counter++; this.max = this.counter }
    				this.previosState[this.counter] = this.activeState;break;
    				default: throw new Error;			
    		}
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    		this.activeState = 'normal';
    		this.counter = 0;
    		this.max = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    		switch (event){
    				case undefined: return ['normal', 'busy', 'hungry', 'sleeping']; break;
    				case 'study': return ['normal'];
    				case 'get_tired': return ['busy'];
    				case 'get_up': return ['sleeping']; break;
    				case 'get_hungry': return ['busy','sleeping']; break;
    				case 'eat': return ['hungry']; break;
    				default: return [];
    		}
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if(this.counter){
    				this.counter--;
    				this.activeState = this.previosState[this.counter];
    				return true;
    		}
    		else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    		if(this.counter == this.max){
    				return false;
    		}
    		else{
    				this.counter++;
    				this.activeState = this.previosState[this.counter];
    				return true;
    		}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    		this.counter = this.max = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
