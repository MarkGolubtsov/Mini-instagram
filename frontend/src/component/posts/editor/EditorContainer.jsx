import * as React from 'react';
import {withRouter} from 'react-router-dom';
import {Routes} from "../../../constant/Routes";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_LIKED_POSTS, GET_MY_POSTS, GET_ONE_POST} from "../../../constant/query";
import {CREATE_POST, UPDATE_POST} from "../../../constant/mutation";
import Editor from "./Editor";
import LinearProgress from "@material-ui/core/LinearProgress";

const EditorContainer = (props) => {
    const updateCache = (client, {data: {createPost: item}}) => {
        const data = client.readQuery({
            query: GET_MY_POSTS,
        });
        const newData = {
            myPosts: data.myPosts.concat([item])
        }
        client.writeQuery({
            query: GET_MY_POSTS,
            data: {...data, ...newData}
        });

        const likedData = client.readQuery({
            query: GET_LIKED_POSTS,
        });
        client.writeQuery({
            query: GET_LIKED_POSTS,
            data: {...data, likedPosts: likedData.filter(it => it.id !== id)}
        })
    }
    const updateLikes = (client, {data: {updatePost: item}}) => {
        const likedData = client.readQuery({
            query: GET_LIKED_POSTS,
        });
        client.writeQuery({
            query: GET_LIKED_POSTS,
            data: {...data, likedPosts: likedData.filter(it => it.id !== item.id)}
        })
    }


    const id = props.match.params.id;

    const {loading, data} = useQuery(GET_ONE_POST, {
        variables: {id},
        skip: !id,
    });

    const [updatePost] = useMutation(UPDATE_POST);

    const [createPost, {loading: mutationLoading}] = useMutation(CREATE_POST);

    const onSave = (title, body, image = {}) => {
        !id ?
            createPost({
                variables: {
                    title, body, image
                }, update: updateCache
            }).then((res) => props.history.push(Routes.profile))
            :
            updatePost({
                variables: {
                    id, title, body
                }, update: updateLikes
            }).then((res) => props.history.push(Routes.profile))
    };
    return (
        (loading || mutationLoading) ?
            <LinearProgress/>
            :
            <Editor message={<h2>{id ? 'Edit' : 'Create'}</h2>} onCancel={() => props.history.push(Routes.posts)}
                    onSave={onSave} post={id ? {...data.onePost} : {}}/>
    )
}

export default withRouter(EditorContainer);
