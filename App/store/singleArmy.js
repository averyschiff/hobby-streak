import {armies, models, units, tasks} from '../db'

const SET_ARMY = 'SET_ARMY'
const SET_UNITS = 'SET_UNITS'
const ADD_UNIT = 'ADD_UNIT'
const REMOVE_UNIT = 'REMOVE_UNIT'
const SET_NOTE = 'SET_NOTE'
const SET_TAGS = 'SET_ARMY_TAGS'

export const setArmy = (army) => ({
  type: SET_ARMY,
  army
})

export const setUnits = (units) => ({
  type: SET_UNITS,
  units
})

export const addUnit = (unit) => ({
  type: ADD_UNIT,
  unit
})

export const removeUnit = (unit_id) => ({
  type: REMOVE_UNIT,
  unit_id
})

export const setNote = (note) => ({
	type: SET_NOTE,
	note
})

export const setTags = (tags) => ({
  type: SET_TAGS,
  tags
})

export const getArmy = (army_id) => {
  return async dispatch => {
		await armies.getEntry(army_id,
			(_, {rows}) => {
				dispatch(setArmy(rows.item(0)))
			},
			(_, err)=> {alert('Error retrieving army: ' + err)}
		)
  }
}

export const getUnits = (army_id) => {
  return async dispatch => {
		await units.getEntryByHigher("army", army_id,
			(_, {rows}) => {
				dispatch(setUnits(rows['_array']))
			},
			(_, err)=> {alert('Error retrieving units: ' + err)}
		)
  }
}

export const createUnit = (unitName, army_id) => {
	return async dispatch => {
		await units.newUnit(unitName, army_id,
			(_, {insertId}) => {
				dispatch(addUnit({
          id: insertId, 
          unitName
				}))
			},
			(_, err) => {alert('Error creating unit: ' + err)}
		)
	}
}

export const deleteUnit = (unit_id) => {
  return async dispatch => {
    await tasks.deleteEntryByHigher("unit", unit_id,
      models.deleteEntryByHigher("unit", unit_id,
        units.deleteEntry(unit_id,
          (_, {}) => {
            dispatch(removeUnit(unit_id))
          },
          (_, err) => {alert('Error deleting unit: ' + err)}
        ),
        (_, err) => {alert('Error deleting models for unit: ' + err)}
      ),
      (_, err)=>{alert('Error deleting tasks for unit: ' + err)}
    )
  }
}

export const updateNote = async (note, army_id) => {
	await armies.updateVal("note", note, army_id,
		null,
		(_, err)=> {alert('Error updating note: ' + err)}
	)
}
export const updateTags = (tags, oldTags, army_id) => {
	let newTags = ''
	if (oldTags) newTags = oldTags + tags + ', '
	else if (tags) newTags = tags + ', '
	return async dispatch => {
		await armies.updateVal("tags", newTags, army_id,
			(_, rows) => {
				dispatch(setTags(newTags))
			},
			(_, err)=> {
				console.log('Error updating tags: ' + err)
			}
		)
	}
}

const initialArmy = {
  army: {},
  units: [],
}

export default function (state=initialArmy, action){
  switch(action.type){
    case SET_ARMY:
      return {
        ...state,
        army: action.army
      }
    
    case SET_UNITS:
      return {
        ...state,
        units: action.units
      }
    case ADD_UNIT:
      return {
        ...state,
        units: [
          ...state.units,
          action.unit
        ],
      }
    case REMOVE_UNIT:
      return {
        ...state,
        units: state.units.filter(unit=>{
          return unit.id!=action.unit_id
        })
      }
		case SET_NOTE:
			return {
				...state,
				army: {
					...state.army,
					note: action.note
				}
			}
    case SET_TAGS:
      return {
        ...state,
        army: {
          ...state.army,
          tags: action.tags
        }
      }
    default:
      return state
  }
}
