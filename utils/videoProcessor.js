const ffmpeg = require('fluent-ffmpeg');

/**
 * @param {string} videoPath 
 * @returns {Promise<number>} 
 */
exports.getVideoDuration = (videoPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                reject(err);
            } else {
                const duration = metadata.format.duration;
                resolve(duration);
            }
        });
    });
};

/**
 * @param {string} inputPath 
 * @param {string} outputPath 
 * @param {string} format 
 * @returns {Promise<void>} 
 */
exports.convertVideoFormat = (inputPath, outputPath, format) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .toFormat(format)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .saveToFile(outputPath);
    });
};
