import AaxHashAlgorithm from "./AaxHashAlgorithm";

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}
export async function extractChecksum(file) {
    const slic = file.slice(653, 653 + 20);
    return buf2hex(await slic.arrayBuffer());
}


export const resolveActivationBytes = async (checksum) => {
    try {
        let request = await fetch("https://aax.api.j-kit.me/api/v2/activation/" + checksum);
        let result = await request.json();
        const { success, activationBytes } = result;

        if (success !== true) {
            // this.setState({ activationBytes: 'UNKNOWN' });
            // this.addNotification("An error occured while resolving the activation bytes, please check your inputs", false);
            debugger;
            return null;
        }

        if (success === true) {
            const calculatedChecksum = await AaxHashAlgorithm.CalculateChecksum(activationBytes);
            if (calculatedChecksum == checksum) {
                // this.setState({ activationBytes: activationBytes });
                // this.addNotification("Successfully resolved the activation bytes");
                return activationBytes;
            }

            // this.setState({ activationBytes: "API ERROR" });
            // this.addNotification("An unexpected error occured while resolving the activation bytes, please try again", false);
            return null;
        }
    } catch (error) {
        // this.setState({ activationBytes: error });
        // this.addNotification("An error occured while resolving the activation bytes, please check your inputs", false);
       
        return null;
    }
}