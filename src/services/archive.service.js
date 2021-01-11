import archiver from 'archiver';
import fs from 'fs';
import path from "path";

const __dirname = path.resolve();

/**
 * Get Note Archived Location Path
 * @param note_id Note ID
 */
export const archieveNotePath = (note_id) => {
    return path.join(__dirname, process.env.ARCHIVE_FILE_PATH, `${note_id}.zip`);
}

/**
 * Archive a Notes
 * @param note_id Note ID to be Archived
 * @param note_title Note Title
 * @param note_content Note Content
 */
export const ArchieveNote = async (note_id, note_title, note_content) => {
    try {

        // create a file to stream archive data to.
        const output = fs.createWriteStream(archieveNotePath(note_id));
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', () => {
            console.log(`${archive.pointer()} total bytes`);
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });

        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', () => {
            console.log('Data has been drained');
        });

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {
                console.error(err);
            } else {
                throw err;
            }
        });

        // good practice to catch this error explicitly
        archive.on('error', (err) => {
            throw err;
        });

        // pipe archive data to the file
        archive.pipe(output);

        // append a file from buffer
        var buffer = Buffer.from(note_content);
        archive.append(buffer, { name: `${note_title}.txt` });

        archive.finalize();
    } catch (err) {
        throw err;
    }
}

/**
 * Unarchive a Notes
 * @param note_id Note ID to be Unarchived
 */
export const UnarchieveNote = async (note_id) => {
    try {
        const archivedFilePath = archieveNotePath(note_id);
        fs.unlinkSync(archivedFilePath);
    } catch (err) {
        throw err;
    }
}