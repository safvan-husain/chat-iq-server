import bcrypt from 'bcryptjs';

export class Password {
    private rounds: number;
    constructor(rounds: number = 10) {
        this.rounds = rounds;
    }

    // Hashing method
    public async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.rounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    // Validating method
    public async validate(password: string, hash: string): Promise<boolean> {
        const isValid = await bcrypt.compare(password, hash);
        return isValid;
    }
}
