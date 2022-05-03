// import { MediaInfo } from 'mediainfo.js';
// import React, { useState, useEffect, useRef } from 'react';
// import ScriptLoader from './script-loader';

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
