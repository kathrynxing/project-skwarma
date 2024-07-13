// import { record_price } from "@/app/lib/data";
import { Record } from './definitions';
const algoliasearch = require('algoliasearch');
const MECclient = algoliasearch('DH7OME2L5T', 'b3cfdf65ad18464b8b5453a5f122f74d');
const products_en_index = MECclient.initIndex('products_en');

const test_req = '"{\"requests\":[{\"indexName\":\"products_en\",\"params\":\"analyticsTags=%5B%22mec%22%2C%22search%22%2C%22desktop%22%2C%22external%22%5D&clickAnalytics=true&facetFilters=%5B%5B%22categories.lvl0%3AProducts%22%5D%5D&facets=%5B%22*%22%5D&filters=&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=52&maxValuesPerFacet=100&page=0&query=scarpa%20instinct&tagFilters=&userToken=anonymous-db921709-a294-4c98-8919-81bb8a96f61e\"},{\"indexName\":\"products_en\",\"params\":\"analytics=false&analyticsTags=%5B%22mec%22%2C%22search%22%2C%22desktop%22%2C%22external%22%5D&clickAnalytics=false&facets=%5B%22categories.lvl0%22%5D&filters=&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=0&maxValuesPerFacet=100&page=0&query=scarpa%20instinct&userToken=anonymous-db921709-a294-4c98-8919-81bb8a96f61e\"}]}"';
/* 
    facets=[\"categories.lvl0\"]
    list of climbing shoes to track
    skwarma 
    get price every 24 hour
    record in database
    alert 
*/
export function run_MEC_API(){
    let records: Record[] = [];
    try {
        products_en_index.search('skwarma climbing shoes', {
            headers: {'userToken':'anonymous-db921709-a294-4c98-8919-81bb8a96f61e'},
            filters: "brand:'La Sportiva' AND gender:'womens'",
            // only returns one record, how to return two or array of sizes
            // AND sizeShoeWomens:37 OR sizeShoeWomens:37.5
        })
        .then(({hits}) => {
            console.log(hits);
            records.push( {
                id: 'test',
                name: 'testname',
                price: 344,
                created_at: 'today',
            });
            // record_price({
            //     id: hits.sku,
            //     name: hits.title,
            //     price: hits.salePrice,
            //     created_at: '', // empty 
            // });
            // salePrice 
            // price
        });
        return records;
    } catch (error) {
        console.error('error', error);
    }

}
run_MEC_API();