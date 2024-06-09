// fetchData.ts
import { PoolData } from './types';

export async function fetchData(setData: (data: PoolData[]) => void, logMessage: (message: string) => void) {
    try {
        const quickswapResponse = await fetch('/quickswapchart.json');
        const uniswapResponse = await fetch('/uniswapchart.json');

        const quickswapData: PoolData[] = await quickswapResponse.json();
        const uniswapData: PoolData[] = await uniswapResponse.json();

        const combinedData = [...quickswapData, ...uniswapData];
        setData(combinedData);

        logMessage('Data fetched successfully from both sources');
    } catch (error) {
        logMessage(`Error fetching table data: ${error}`);
    }
}
