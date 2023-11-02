import React, { Fragment, useRef, useState } from 'react'
import data from '../../data/data'
import './gallery.scss'

const Gallery = () => {
    let [datas, setData] = useState(data)
    let [deleteitem, setDeleteitem] = useState([])
    let dragItem = useRef(null)
    let dragOverItem = useRef(null)
    
    // Handle select and unselect image for deleting
    const onHandle = (e, i) => {
        let newArray = [...datas]
        var _data = [...deleteitem]
        newArray[i] = { ...newArray[i], isChecked: !newArray[i].isChecked }
        setData(newArray)
        if (e.target.checked) {
            _data = [..._data, e.target.value]
        } else {
            _data.splice(_data.indexOf(e.target.value), 1);
        }
        setDeleteitem(_data)
    }

    // Handle delete alll selected image by filter all checked image
    const onHandleDelete = () => {
        let myArr = [...datas]

        myArr = myArr.filter((i) => !i.isChecked)

        setData(myArr)
        setDeleteitem([])
    }

    //handle drag sorting
    const handleSorting = () => {
        //duplicate item
        let _data = [...datas]

        //remove and save the drag item
        const _dragItem = _data.splice(dragItem.current, 1)[0]

        //switch the position
        _data.splice(dragOverItem.current, 0, _dragItem)

        //reset the position
        dragItem.current = null
        dragOverItem.current = null

        //update the real data array
        setData(_data)
    }

    return (
        <Fragment>
            <div className="card">
                {
                    !deleteitem.length ?
                        <div className='card_top'>
                            <span>Gallery</span>
                        </div>
                        :
                        <div className='card_top'>
                            <span>
                                <input type="checkbox" checked name="dummy" id="" />
                                {deleteitem.length} file selected
                            </span>
                            <b onClick={onHandleDelete} role='button'>Delete file</b>
                        </div>
                }
                <div className="gallery">
                    {
                        datas.map((item, i) =>
                            <div className={`image ${!i && 'grid-col-2 grid-rows-2'}`} key={i} draggable

                                // store index of drag item
                                onDragStart={() => dragItem.current = i}

                                // store index of drag over item
                                onDragEnter={() => dragOverItem.current = i}

                                // sort all image when drag end
                                onDragEnd={handleSorting}
                                onDragOver={e => e.preventDefault()}
                            >
                                <img src={item.src} alt="Gallery Img" srcset="" className="img" />
                                <div className={`select ${item.isChecked && "show"}`}></div>
                                <input checked={item.isChecked} onChange={(e) => onHandle(e, i)} className={`checkbox ${item.isChecked && "show"}`} type="checkbox" value={item.id} name={item.name} id={item.name} />
                            </div>
                        )
                    }
                    <div className={`image`}>
                        <div className="add_image">
                            <i class="ri-image-add-fill"></i>
                            <span>Add Images</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Gallery