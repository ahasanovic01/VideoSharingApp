const ffmpeg = require('fluent-ffmpeg');

/**
 * Get video duration.
 * @param {string} videoPath Path to the video file.
 * @returns {Promise<number>} A promise that resolves to the duration of the video in seconds.
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
 * Convert video to a different format.
 * @param {string} inputPath Path to the input video file.
 * @param {string} outputPath Path where the output video will be saved.
 * @param {string} format The desired output format (e.g., 'mp4').
 * @returns {Promise<void>} A promise that resolves when conversion is complete.
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
