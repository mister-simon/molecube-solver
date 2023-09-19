export default function* permute(permutation) {
    var length = permutation.length,
        c = Array(length).fill(0),
        i = 1, k, p;

    yield permutation.slice();
    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            yield permutation.slice();
        } else {
            c[i] = 0;
            ++i;
        }
    }
}



function checkSetDuplicates(sets) {
    for (const set of sets) {
        const colors = {};

        for (const color of set) {
            if (colors[color] === 1) {
                return true;
            }

            colors[color] = 1;
        }
    }

    return false;
};

export function* permuteStickers() {
    for (const corners of permute([
        'white',
        'orange',
        'black',
        'yellow',
        'lblue',
        'dblue',
        'green',
        'green',
    ])) {
        // Dumb centre check
        if (
            corners[1 - 1] === 'white'
            || corners[2 - 1] === 'white'
            || corners[3 - 1] === 'white'
            || corners[4 - 1] === 'white'

            || corners[3 - 1] === 'orange'
            || corners[4 - 1] === 'orange'
            || corners[5 - 1] === 'orange'
            || corners[6 - 1] === 'orange'

            || corners[3 - 1] === 'lblue'
            || corners[5 - 1] === 'lblue'
            || corners[1 - 1] === 'lblue'
            || corners[7 - 1] === 'lblue'

            || corners[5 - 1] === 'black'
            || corners[6 - 1] === 'black'
            || corners[7 - 1] === 'black'
            || corners[8 - 1] === 'black'

            || corners[6 - 1] === 'dblue'
            || corners[4 - 1] === 'dblue'
            || corners[8 - 1] === 'dblue'
            || corners[2 - 1] === 'dblue'

            || corners[7 - 1] === 'yellow'
            || corners[8 - 1] === 'yellow'
            || corners[1 - 1] === 'yellow'
            || corners[2 - 1] === 'yellow'
        ) {
            continue;
        }

        const hasCornerSetDuplicates = checkSetDuplicates(
            [
                [
                    corners[1 - 1],
                    corners[2 - 1],
                    corners[3 - 1],
                    corners[4 - 1],
                ],
                [
                    corners[3 - 1],
                    corners[4 - 1],
                    corners[5 - 1],
                    corners[6 - 1],
                ],
                [
                    corners[3 - 1],
                    corners[5 - 1],
                    corners[1 - 1],
                    corners[7 - 1],
                ],
                [
                    corners[5 - 1],
                    corners[6 - 1],
                    corners[7 - 1],
                    corners[8 - 1],
                ],
                [
                    corners[6 - 1],
                    corners[4 - 1],
                    corners[8 - 1],
                    corners[2 - 1],
                ],
                [
                    corners[7 - 1],
                    corners[8 - 1],
                    corners[1 - 1],
                    corners[2 - 1],
                ],
            ]
        );

        if (hasCornerSetDuplicates) {
            continue;
        }

        // Permute the edges with the current corner permutation
        for (const edges of permute([
            'white',
            'orange',
            'black',
            'yellow',
            'lblue',
            'dblue',
            'purple',
            'purple',
            'purple',
            'red',
            'red',
            'red',
        ])) {
            if (
                edges[9 - 9] === 'white'
                || edges[10 - 9] === 'white'
                || edges[11 - 9] === 'white'
                || edges[12 - 9] === 'white'

                || edges[12 - 9] === 'orange'
                || edges[13 - 9] === 'orange'
                || edges[14 - 9] === 'orange'
                || edges[15 - 9] === 'orange'

                || edges[13 - 9] === 'lblue'
                || edges[10 - 9] === 'lblue'
                || edges[16 - 9] === 'lblue'
                || edges[18 - 9] === 'lblue'

                || edges[15 - 9] === 'black'
                || edges[16 - 9] === 'black'
                || edges[17 - 9] === 'black'
                || edges[19 - 9] === 'black'

                || edges[14 - 9] === 'dblue'
                || edges[17 - 9] === 'dblue'
                || edges[11 - 9] === 'dblue'
                || edges[20 - 9] === 'dblue'

                || edges[19 - 9] === 'yellow'
                || edges[18 - 9] === 'yellow'
                || edges[20 - 9] === 'yellow'
                || edges[9 - 9] === 'yellow'
            ) {
                continue;
            }

            const hasEdgeSetDuplicates = checkSetDuplicates([
                [
                    edges[9 - 9],
                    edges[10 - 9],
                    edges[11 - 9],
                    edges[12 - 9],
                ],
                [
                    edges[12 - 9],
                    edges[13 - 9],
                    edges[14 - 9],
                    edges[15 - 9],
                ],
                [
                    edges[13 - 9],
                    edges[10 - 9],
                    edges[16 - 9],
                    edges[18 - 9],
                ],
                [
                    edges[15 - 9],
                    edges[16 - 9],
                    edges[17 - 9],
                    edges[19 - 9],
                ],
                [
                    edges[14 - 9],
                    edges[17 - 9],
                    edges[11 - 9],
                    edges[20 - 9],
                ],
                [
                    edges[19 - 9],
                    edges[18 - 9],
                    edges[20 - 9],
                    edges[9 - 9],
                ],
            ]);

            if (hasEdgeSetDuplicates) {
                continue;
            }

            yield [
                ...corners,
                ...edges
            ];
        }
    }
}