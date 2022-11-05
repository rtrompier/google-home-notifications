import { Request } from "express";
import { Observable, throwError } from 'rxjs';
// eslint-disable-next-line
// @ts-ignore
import { Client, DefaultMediaReceiver } from 'castv2-client';

import * as googleTTS from 'google-tts-api';

export class Notifier {

    public handler(request: Request): Observable<void> {
        const destination = request.query.destination as string;
        const text = request.query.text as string;
        const lang = request.query.lang as string || 'en';

        if (!destination) {
            return throwError(() => new Error('Destination parameter is mandatory'));
        }

        if (!text) {
            return throwError(() => new Error('Text parameter is mandatory'));
        }

        return new Observable((observer) => {
            const url = googleTTS.getAudioUrl(text, {
                lang: lang,
                host: 'https://translate.google.com'
            });

            const client = new Client();
            client.connect(destination, () => {
                client.launch(DefaultMediaReceiver, (err: Error, player: any) => {
                    const media = {
                        contentId: url,
                        contentType: "audio/mp3",
                        streamType: "BUFFERED",
                    };

                    player.load(media, { autoplay: true }, (err: Error, status: any) => {
                        client.close();
                        observer.next(status);
                        observer.complete();
                        console.log(`Pushed message to device at ${destination}`);
                    });
                });
            });

            client.on("error", (err: Error) => {
                observer.error(`Google Cast Client error:\n${err}`);
                client.close();
            });
        });
    }

}