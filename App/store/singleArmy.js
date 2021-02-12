import {armies, units} from '../db'

const SET_ARMY = 'SET_ARMY'
const SET_UNITS = 'SET_UNITS'
const ADD_UNIT = 'ADD_UNIT'
const REMOVE_UNIT = 'REMOVE_UNIT'

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

export const getArmy = (army_id) => {
  return async dispatch => {
		await armies.getArmy(army_id,
			(_, {rows}) => {
				dispatch(setArmy(rows.item(0)))
			},
			(_, err)=> {alert('Error retrieving army: ' + err)}
		)
  }
}

export const getUnits = (army_id) => {
  return async dispatch => {
		await units.getUnitsByArmy(army_id,
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
