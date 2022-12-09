import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import {
//     getAllCategory,
//     addCategory,
//     updateCategories,
//     deleteCategories as deleteCategoriesAction
// } from '../../actions';
import Modal from '../../components/UI/Modal/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosCloudUpload,
    IoMdAdd
} from 'react-icons/io'

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './Components/UpdateCategoriesModal';
import AddCategoryModal from './Components/AddCategoryModal';
import './style.css';
import { useCategoryMaster } from '../../store/category/reducer';
import { REQUEST_CREATE_MASTER_CATEGORY, REQUEST_DELETE_CATEGORY, REQUEST_MASTER_CATEGORY } from '../../store/category/categoryActionTypes';
import { AiFillDelete } from 'react-icons/ai';

/**
* @author
* @function Category
**/

const Category = (props:any) => {

    // const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState<any>([]);
    const [expanded, setExpanded] = useState<any>([]);
    const [checkedArray, setCheckedArray] = useState<any>([]);
    const [expandedArray, setExpandedArray] = useState<any>([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();
    const { Category} = useCategoryMaster()

    useEffect(() => {
        if ( !(Category || []).length) {
            dispatch({ type: REQUEST_MASTER_CATEGORY });
        }
      }, []);

    // useEffect(() => {
    //     if (!category.loading) {
    //         setShow(false);
    //     }
    // }, [category.loading]);


    const handleClose = () => {

        // const form = new FormData();

        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }

        // form.append('name', categoryName);
        // form.append('parentId', parentCategoryId);
        // form.append('categoryImage', categoryImage);
        let form = {
            name:categoryName,
            parentId:parentCategoryId,
            categoryImage
        }
        dispatch({ type: REQUEST_CREATE_MASTER_CATEGORY ,payload:form});
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories:any = (categories:any) => {
        let myCategories = [];
        if(categories){
        let category:any
        for ( category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
    }
        return myCategories;
    }

    const createCategoryList = (categories:any, options:any = []) => {
        if(categories){
            let category:any
        for (category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                // type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        }
        return options;
    }

    const handleCategoryImage = (e:any) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(Category);
        const checkedArray:any = [];
        const expandedArray:any = [];
        checked.length > 0 && checked.forEach((categoryId:any, index:any) => {
            const category = categories.find((category:any, _index:any) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId:any, index:any) => {
            const category = categories.find((category:any, _index:any) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key:any, value:any, index:any, type:any) => {
        console.log(value);
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item:any, _index:any) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item:any, _index:any) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item:any, index:any) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            // form.append('type', item.type);
        });
        checkedArray.forEach((item:any, index:any) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            // form.append('type', item.type);
        });
        // dispatch(updateCategories(form));
        
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item:any, index:any) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item:any, index:any) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch({type: REQUEST_DELETE_CATEGORY,payload:checkedIdsArray})
                // .then((result:any) => {
                //     if (result) {
                //         // dispatch(getAllCategory())
                //         setDeleteCategoryModal(false)
                //     }
                // });  
        }

        setDeleteCategoryModal(false);


    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >


                <h5>Expanded</h5>
                { expandedArray.map((item:any, index:any) => <span key={index}>{item.name}</span>)}
                <h5>Checked</h5>
                { checkedArray.map((item:any, index:any) => <span key={index}>{item.name}</span>)}

            </Modal>
        );
    }

    const categoryList = createCategoryList(Category);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span style={{marginRight: '8px'}}>Actions: </span>
                                <button onClick={handleShow}><IoMdAdd /> <span>Add</span></button>
                                <button onClick={deleteCategory}><AiFillDelete color='red' /> <span>Delete</span></button>
                                {/* <button onClick={updateCategory}><IoIosCloudUpload /> <span>Edit</span></button> */}
                            </div>

                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(Category)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <AddCategoryModal
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Add New Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            {/* {renderAddCategoryModal()} */}
            {renderDeleteCategoryModal()}
        </Layout>
    )

}

export default Category