import React, { useState } from "react";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// export default class OnlineConverter {
//     constructor() {
//     }

//     static async GetInfos(file) {
//         const ffmpeg = createFFmpeg({
//             log: true,
//             progress: ({ ratio }) => {
//                 setMessage(`Complete: ${(ratio * 100.0).toFixed(2)}%`);
//             }
//         });

//         const command = '-y -i ' + file;
//         setMessage('Loading ffmpeg-core.js');
//         await ffmpeg.load();
//         setMessage('Start transcoding');
//         ffmpeg.FS('writeFile', file.name, await fetchFile(file));
//         await ffmpeg.run(...command);
//     }
// }

// OnlineConverter.exports = OnlineConverter
const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/ffmpeg-core/ffmpeg-core.js",
    progress: ({ ratio }) => {
        console.log(`Complete: ${(ratio * 100.0).toFixed(2)}%`);
    },
});

export const GetInfos = async (file) => {
    if(!ffmpeg.isLoaded()) {
        console.log('Loading ffmpeg-core.js');
        await ffmpeg.load();
    }


    const command =  ['-y', '-i', file.name];
   
    console.log('Start transcoding');
    ffmpeg.FS('writeFile', file.name, await fetchFile(file));
    await ffmpeg.run(...command);
    console.log('ffmpeg ended');
    ffmpeg.FS('unlink', file.name);

    // ffmpeg.exit(0);
};
