import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers} from 'redux';
import uuid from 'uuid';


const addExpense=({description='', amount=0,note='',createdAt=0}={})=>{
    return{
        type:'ADD_EXPENSE',
        expense:{
            amount,
            id:uuid(),
            description,
            note,
            createdAt
        }
    }
}
const removeExpense=({id}={})=>{
    return{
        type:'REMOVE_EXPENSE',
        id
    }
}

const editExpense=(id,update)=>{
    return{
        type:'EDIT_EXPENSE',
        id,
        update
    }
}
const setTextFilter=(text='')=>{
    return{
    type:'SET_TEXT',
    text
    }
}

const expensedefult=[]
const filterdefult={
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
}
const filterReducer=(state=filterdefult,action)=>{
    switch(action.type){
        case 'SET_TEXT':
            return {
                ...state,
                text:action.text
            }
         default:
             return state   
    }
    }
const expenseReducer=(state=expensedefult,action)=>{
switch(action.type){
    case 'ADD_EXPENSE':
        return[
            ...state,
            action.expense
        ]

    case 'REMOVE_EXPENSE':
       return [
           state.filter(({id})=>{
               return id!=action.id
           }
           )
       ]    
    case 'EDIT_EXPENSE':   
        return[
            state.map((expen)=>{
                if(expen.id===action.id){
                return{
                    ...expen,
                    ...action.update
                }}
                else
                return expen

            }
            )
        ]
    default:
        return state    

}
}

const store=createStore(
    combineReducers({
        expense:expenseReducer,
        filters:filterReducer
    })
)
store.subscribe(()=>{
    console.log(store.getState())
})
const one=store.dispatch(addExpense({amount:1200,description:"Rent"}))
store.dispatch(setTextFilter('rent'))
