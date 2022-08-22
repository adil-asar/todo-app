import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { nanoid } from 'nanoid'
const Todo = () => {

    const [inp, setinp] = useState('')
    const [item, setitem] = useState([])

    useEffect(() => {
        const fetched = JSON.parse(localStorage.getItem('TODO'))
        setitem(fetched)
    }, [])


    const Submit = (e) => {
        e.preventDefault()
        const newitem = { id: nanoid(), thing: inp }
        if (inp && inp.trim('') && inp.length >=3 ) {
            const item_added = [...item, newitem]
            localStorage.setItem('TODO', JSON.stringify(item_added))
            setitem(item_added)
            setinp('')
        }

    }

    const delete_item = (id) => {
        let Delete = JSON.parse(localStorage.getItem('TODO'))
        Delete = Delete.filter((fil) => fil.id !== id)
        localStorage.setItem('TODO', JSON.stringify(Delete))
        setitem(Delete)
    }








    return (
        <div className='todo'>

            <h3 className='heading'>
                Add Your Item Here
            </h3>

            <div className="form">
                <input
                    type="text"
                    value={inp}
                    onChange={(e) => setinp(e.target.value)}
                    placeholder='Add item ...'
                    className='inp_css'
                />
                <AiOutlinePlusCircle
                    className='icon'
                    onClick={Submit}
                />
            </div>

            {
                item.map((elem) => {
                    return <div
                        className="list"
                        key={elem.id}>
                        <span className='list_item'>
                            {elem.thing}
                        </span>
                        <TiDeleteOutline
                            className='delete_icon'
                            onClick={() => delete_item(elem.id)}
                        />
                    </div>

                })
            }





        </div>
    )
}

export default Todo