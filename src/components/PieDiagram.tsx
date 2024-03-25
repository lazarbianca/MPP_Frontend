import {PieChart} from '@mui/x-charts/PieChart';
import {useEffect} from 'react';
import usePaintingStore from '../stores/PaintingStore';

function useCountByMovement(m: string) {
    const {filteredPaintings, filterPaintings} = usePaintingStore();
    useEffect(() => {
        filterPaintings(m);
    }, []);

    filteredPaintings.map((p) => {
        console.log(`for filter key ${m}, ${p.title}`);
    });
    return filteredPaintings.length;
}
export default function BasicPie() {
    return (
        <PieChart
            //margin={{top: 100, bottom: 100, left: 100, right: 100}}
            slotProps={{
                legend: {
                    direction: 'column',
                    position: {vertical: 'middle', horizontal: 'right'},
                    padding: -10,
                    labelStyle: {
                        fontSize: 18,
                        fill: 'white',
                    },
                },
            }}
            series={[
                {
                    data: [
                        {
                            id: 0,
                            value: useCountByMovement('Renaissance'),
                            label: 'Renaissance',
                        },
                        {
                            id: 1,
                            value: useCountByMovement('Baroque'),
                            label: 'Baroque',
                        },
                        {
                            id: 2,
                            value: useCountByMovement('Romanticism'),
                            label: 'Romanticism',
                        },
                        {
                            id: 3,
                            value: useCountByMovement('Realism'),
                            label: 'Realism',
                        },
                        {
                            id: 4,
                            value: useCountByMovement('Impressionism'),
                            label: 'Impressionism',
                        },
                        {
                            id: 5,
                            value: useCountByMovement('Surrealism'),
                            label: 'Surrealism',
                        },
                        {
                            id: 6,
                            value: useCountByMovement('Post Modernism'),
                            label: 'Post Modernism',
                        },
                    ],
                },
            ]}
            width={1000}
            height={500}
        />
    );
}
