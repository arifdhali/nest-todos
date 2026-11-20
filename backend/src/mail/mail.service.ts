import { Injectable, OnModuleInit } from '@nestjs/common';
import nodemailer from 'nodemailer';
import type { Transport } from 'nodemailer';

@Injectable()
export class MailService implements OnModuleInit {
    private readonly transporter: Transport;
    private readonly from: string;

    constructor() {
        // this.transporter = nodemailer.createTransport({})
    }


    async onModuleInit() {
        try {
            // await this.transporter.verify()
        } catch (error) {

        }
    }
}
