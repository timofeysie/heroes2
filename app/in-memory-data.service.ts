import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
        { id: 1, name: 'Page 1', 
          text: 'Myra the Ferryboat'},
        { id: 2, name: 'Page 2', 
          text: 'Myra is the ferry from Palm Beach to Coasters Retreat and the Basin.'},
        { id: 3, name: 'Page 3', 
          text: 'All day long Myra picks up passengers & their supplies & takes them to the other side.'},
        { id: 4, name: 'Page 4', 
          text: 'There & back & there & back & there & back again.'},
        { id: 5, name: 'Page 5', 
          text: 'It\'s difficult sometimes when children spill their chips on her teak deck.'},
        { id: 6, name: 'Page 6', 
          text: 'Early in the morning while all the other  boats are asleep, hard working Myra is always the first boat to leave her mooring.'},
        { id: 7, name: 'Page 7', 
          text: 'And then at night, Myra is always the last to tie up after all the other boats have gone to sleep.'},
        { id: 8, name: 'Page 8', text: '... dreaming ...'},
        { id: 9, name: 'Page 9', text: 'One day as Myra approached the Basin overloaded with campers and their supplies...'},
        { id: 10, name: 'Page 10', text: ''},
        { id: 11, name: 'Page 11', text: ''},
        { id: 12, name: 'Page 12', text: ''},
        { id: 13, name: 'Page 13', text: ''},
        { id: 14, name: 'Page 14', text: ''},
    ];
    return {heroes};
  }
}
