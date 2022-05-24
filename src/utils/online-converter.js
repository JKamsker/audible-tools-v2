/*
This thing works in the console:
    const script = document.createElement('script');
    script.src = './mediainfo.js/mediainfo.js';
    script.async = true;
    document.body.appendChild(script);

    var minfo = await MediaInfo();
*/

import ScriptLoader from './script-loader';

export default class OnlineConverter {
    constructor(options) {

    }

    getInfo = async (file, onProgress) => {
        const mi = await OnlineConverter.getMediaInfo();
        const rawInfo = await mi.analyzeData(() => file.size, this.readChunk(file, offset => {
            if(onProgress){
                onProgress({current: offset, total: file.size, percent: offset / file.size * 100});
            }
            // console.log(`reading chunk ${offset} of ${file.size} (${(offset/file.size*100).toFixed(2)}%)`);
        }));
        return {
            author: rawInfo.media.track[0].Album_Performer,
            title: rawInfo.media.track[0].Title,
            fileName: file.name,
            duration: this.getHHMMSSFromSeconds(rawInfo.media.track[1].Duration),
            cover: rawInfo.media.track[0].Cover_Data,
            file
          };
    }

    getHHMMSSFromSeconds = (totalSeconds) => {
        if (!totalSeconds) {
          return '00:00:00';
        }
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor(totalSeconds % 3600 / 60);
        const seconds = Math.round(totalSeconds % 60);
        const hhmmss = this.padTo2(hours) + ':' + this.padTo2(minutes) + ':' + this.padTo2(seconds);
        return hhmmss;
    }

    padTo2 = (value) => {
        if (!value) {
          return '00';
        }
        return value < 10 ? String(value).padStart(2, '0') : value;
      }

    
    readChunk = (file, callback) => (chunkSize, offset) =>
        new Promise((resolve, reject) => {
            if(callback){
                callback(offset);
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target.error) {
                    reject(event.target.error);
                }
                resolve(new Uint8Array(event.target.result));
            };
            reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
        });
        

    

    static async getMediaInfo() {
        await OnlineConverter.initialize();
        return OnlineConverter.__mediaInfo;
    }

    static async initialize() {
        if(!OnlineConverter.__mediaInfo ){
            await this.__load_mediaInfoJs();
            OnlineConverter.__mediaInfo = await MediaInfo({ coverData: true });
        }
    }

    static __load_mediaInfoJs() {
        if(!OnlineConverter.__loader){
            OnlineConverter.__loader = new ScriptLoader({
                src: './mediainfo.js/mediainfo.js',
                global: 'Segment',
            });
        }
        return OnlineConverter.__loader.load();
    }
}



// const readChunk = (file) => (chunkSize, offset) =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             if (event.target.error) {
//                 reject(event.target.error);
//             }
//             resolve(new Uint8Array(event.target.result));
//         };
//         reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
//     });

// const getLoader = () => window._scrLoader ??= new ScriptLoader({
//     src: './mediainfo.js/mediainfo.js',
//     global: 'Segment',
// });

// async function ResolveMediaInfo() {
//     await getLoader().load();
//     debugger;
    
//     MediaInfo().then((mediainfo)=>{
//         debugger;
//     });
    
//     return window._mediaInfo ??= await MediaInfo();
// }

// export async function GetInfo(file) {
//     let info = await ResolveMediaInfo();
//     return await mediainfo.analyzeData(() => file.size, readChunk(file));
//     const MediaInfo = await require('./mediainfo.js');
//     MediaInfo({ format: 'text' }, (mediainfo) => {
//         debugger;
//     });
//     return new Promise(async (res) => {

//         // MediaInfo().then((mediainfo) => {
//         //     mediainfo
//         //         .analyzeData(() => file.size, readChunk(file))
//         //         .then((result) => {
//         //             res(result);
//         //         });
//         // });
//     });
// }

// //---

// // import React, { useState } from "react";
// // import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// // // import {} from 'mediainfo.js/dist/mediainfo'

// // // export default class OnlineConverter {
// // //     constructor() {
// // //     }

// // //     static async GetInfos(file) {
// // //         const ffmpeg = createFFmpeg({
// // //             log: true,
// // //             progress: ({ ratio }) => {
// // //                 setMessage(`Complete: ${(ratio * 100.0).toFixed(2)}%`);
// // //             }
// // //         });

// // //         const command = '-y -i ' + file;
// // //         setMessage('Loading ffmpeg-core.js');
// // //         await ffmpeg.load();
// // //         setMessage('Start transcoding');
// // //         ffmpeg.FS('writeFile', file.name, await fetchFile(file));
// // //         await ffmpeg.run(...command);
// // //     }
// // // }

// // // OnlineConverter.exports = OnlineConverter
// // const ffmpeg = createFFmpeg({
// //     log: true,
// //     corePath: "/ffmpeg-core/ffmpeg-core.js",
// //     progress: ({ ratio }) => {
// //         // console.log(`Complete: ${(ratio * 100.0).toFixed(2)}%`);
// //     },
// //     logger: (message) => {
// //         // console.log(message);
// //         // debugger;
// //     }
// // });

// // export const GetInfos = async (file) => {
// //     if (!ffmpeg.isLoaded()) {
// //         console.log('Loading ffmpeg-core.js');
// //         await ffmpeg.load();
// //     }

// //     // ffmpeg -i .\Audible_AAX_sample_62689101.aax -f ffmetadata in.txt

// //     // const command =  ['-y', '-i', file.name];
// //     const command = ['-y', '-i', file.name, '-f', 'ffmetadata', 'in.txt'];

// //     console.log('Loading file');
// //     ffmpeg.FS('writeFile', file.name, await fetchFile(file));
// //     console.log('Start transcoding');
// //     await ffmpeg.run(...command);
// //     console.log('ffmpeg ended');
// //     const data = ffmpeg.FS('readFile', 'in.txt');
// //     let result = decodeURIComponent(escape(String.fromCharCode(...data)))

// //     console.log(result);
// //     ffmpeg.FS('unlink', file.name);

// //     // ffmpeg.exit(0);
// // };
