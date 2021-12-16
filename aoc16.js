const input = await Deno.readTextFile('./inputs/day16.txt')
const transform = input.split('').map(x => parseInt(x, 16).toString(2).padStart(4, '0')).join('');

part1();
part2();

function part1() {
    const topLevelPacket = doIt(transform);
    console.log(recursiveVersionSum(topLevelPacket));
}

function part2() {
    const topLevelPacket = doIt(transform);
    console.log(topLevelPacket.val);
}

function recursiveVersionSum(packet) {
    return packet.version + packet.packets.map(recursiveVersionSum).reduce((a, b) => a+b, 0);
}

function doIt(inp) {
    const version = parseInt(inp.substr(0,3), 2);
    const typeId = parseInt(inp.substr(3, 3), 2);

    if(typeId === 4) {
        // Value packet
        let idx = 6;
        let val = ''
        while(inp[idx] !== undefined) {
            val += inp.substr(idx+1, 4);

            if(inp[idx] === '0') {
                idx += 5;
                break;
            }
            idx += 5;
        }

        return {
            version,
            typeId,
            val: parseInt(val, 2),
            packetLength: idx,
            packets: []
        };
    } else {
        const packets = [];
        let consumed;
        if(inp[6] === '0') {  // next 15 bits are the length
            const length = parseInt(inp.substr(7, 15), 2);
            consumed = 22;
            while (consumed < 22 + length) {
                const subpackets = inp.substr(consumed);
                const packet = doIt(subpackets);
                packets.push(packet);
                consumed += packet.packetLength;
            }


        } else {
            consumed = 18;
            const nrOfSubpackets = parseInt(inp.substr(7, 11), 2);
            for (let i = 0; i < nrOfSubpackets; i++) {
                const packet = doIt(inp.substr(consumed));
                packets.push(packet);
                consumed += packet.packetLength;
            }
        }

        let val = 0;
        const values = packets.map(x => x.val);
        if(typeId === 0) val = values.reduce((a,b) => a+b, 0);
        if(typeId === 1) val = values.reduce((a,b) => a*b, 1);
        if(typeId === 2) val = values.reduce((a,b) => Math.min(a, b));
        if(typeId === 3) val = values.reduce((a,b) => Math.max(a, b));
        if(typeId === 5) val = values[0] > values[1] ? 1 : 0;
        if(typeId === 6) val = values[0] < values[1] ? 1 : 0;
        if(typeId === 7) val = values[0] === values[1] ? 1 : 0;

        return {
            version,
            typeId,
            val,
            packetLength: consumed,
            packets: packets
        };
    }
}


