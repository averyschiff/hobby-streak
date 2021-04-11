import {armies, models, units, tasks} from '../db'

const SET_ARMIES = 'SET_ARMIES'
const ADD_ARMY = 'ADD_ARMY'
const REMOVE_ARMY = 'REMOVE_ARMY'

export const setArmies = (armies) => ({
  type: SET_ARMIES,
  armies
})

export const addArmy = (army) => ({
  type: ADD_ARMY,
  army
})

export const removeArmy = (army_id) => ({
  type: REMOVE_ARMY,
  army_id
})

export const getArmies = () => {
  return async dispatch => {
		await armies.getAllEntries(
			(_, {rows}) => {
				dispatch(setArmies(rows['_array']))
			},
			(_, err)=> {alert('Error retrieving armies: ' + err)}
		)
  }
}

export const createArmy = (armyName) => {
	return async dispatch => {
		await armies.newArmy(armyName,
			(_, {insertId}) => {
				dispatch(addArmy({
          id: insertId, 
          armyName
				}))
			},
			(_, err) => {alert('Error creating army: ' + err)}
		)
	}
}

export const deleteArmy = (army_id) => {
  return async dispatch => {
    await tasks.deleteEntryByHigher("army", army_id,
      models.deleteEntryByHigher("army", army_id,
        units.deleteEntryByHigher("army", army_id,
          armies.deleteEntry(army_id,
            (_, {}) => {
              dispatch(removeArmy(army_id))
            },
            (_, err) => {alert('Error deleting army: ' + err)}
          ),
          (_, err) => {alert('Error deleting units for army: ' + err)}
        ),
        (_, err) => {alert('Error deleting models for army: ' + err)}
      ),
      (_, err)=>{alert('Error deleting tasks for army: ' + err)}
    )
  }
}

const initialArmies = {
  armies: [],
}

export default function (state=initialArmies, action){
  switch(action.type){
    case SET_ARMIES:
      return {
        ...state,
        armies: action.armies
      }
    case ADD_ARMY:
      return {
        ...state,
        armies: [
          ...state.armies,
          action.army
        ],
      }
    case REMOVE_ARMY:
      return {
        ...state,
        armies: state.armies.filter(army=>{
          return army.id!=action.army_id
        })
      }
    default:
      return state
  }
}
