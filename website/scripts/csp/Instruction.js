export default class Instruction {

	constructor(instructionName, var1, var2, rvar=var1){
		this.name = instructionName;
		this.var1 = var1;
		this.var2 = var2;
		this.rvar = rvar;
	}

	static fromObject(obj){
		return new Instruction(obj.instructionName, obj.var1, obj.var2, obj.rvar);
	}

	execute(state){
		let val1 = state[this.var1];
		let val2 = state[this.var2];
		console.log(val1, val2);
		if(val1 === undefined) val1 = parseInt(this.var1);
		if(val2 === undefined) val2 = parseInt(this.var2);
		if(val1 === NaN || val2 === NaN) return state[this.rvar] = false;
		if(typeof val1 !== "number" || typeof val2 !== "number")
			throw new Error(`The values for an assignment were '${val1}' and '${val2}' but were not numbers`);

		switch(this.name){
			case Instruction.names.add[0]: state[this.rvar] = val1 + val2; break;
			case Instruction.names.subtract[0]: state[this.rvar] = val1 - val2; break;
			case Instruction.names.multiply[0]: state[this.rvar] = val1 * val2; break;
			case Instruction.names.divide[0]: state[this.rvar] = val1 / val2; break;
			case Instruction.names.power[0]: state[this.rvar] = Math.pow(val1, val2); break;
			case Instruction.names.greaterThan[0]: state[this.rvar] = val1 > val2; break;
			case Instruction.names.notEqual[0]: state[this.rvar] = val1 !== val2; break;
			case Instruction.names.lessThan[0]: state[this.rvar] = val1 < val2; break;
			case Instruction.names.greaterThanOrEqualTo[0]: state[this.rvar] = val1 >= val2; break;
			case Instruction.names.equal[0]: state[this.rvar] = val1 === va2l; break;
			case Instruction.names.lessThanOrEqualTo[0]: state[this.rvar] = val1 <= val2; break;
			case Instruction.names.and[0]: state[this.rvar] = val1 && val2; break;
			case Instruction.names.or[0]: state[this.rvar] = val1 || val2; break;
			case Instruction.names.not[0]: state[this.rvar] = !val1; break;
			case Instruction.names.bitNot[0]: state[this.rvar] = ~val1; break;
			case Instruction.names.bitAnd[0]: state[this.rvar] = val1 & val2; break;
			case Instruction.names.bitOr[0]: state[this.rvar] = val1 | val2; break;
			case Instruction.names.bitXor[0]: state[this.rvar] = val1 ^ val2; break;
			case Instruction.names.shiftRight[0]: state[this.rvar] = val1 >> va2l; break;
			case Instruction.names.unsignedShiftRight[0]: state[this.rvar] = val1 >>> va2l; break;
			case Instruction.names.shiftLeft[0]: state[this.rvar] = val1 << val2; break;
			default: throw new Error(`Unknown Instruction ${this.name}`);
		}
	}
	
	function refersTo(){
		return new Set([this.var1, this.var2, this.rvar]);
	}
	
}

Instruction.names = {
	add: ["add", "add"],
	subtract: ["sub", "subtract"],
	multiply: ["mul", "multiply"],
	divide: ["div", "divide"],
	power: ["pow", "power"],
	greaterThan: ["grt", "greater than"],
	notEqual: ["neq", "not equal"],
	lessThan: ["lst", "less than"],
	greaterThanOrEqualTo: ["geq", "greater than or equal to"],
	equal: ["eql", "equal"],
	and: ["lnd", "logical and"],
	or: ["lor", "logical or"],
	not: ["lnt", "logical not"],
	bitAnd: ["bnd", "bitwise and"],
	bitOr: ["bor", "bitwise or"],
	bitXor: ["bxr", "bitwise xor"],
	bitNot: ["bnt", "bitwise not"],
	shiftRight: ["shr", "bitwise shift right"],
	unsignedShiftRight: ["usr", "bitwise shift right (zero fill)"],
	shiftLeft: ["shl", "bitwise shift left"],
}
