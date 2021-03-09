import React, { useState } from "react";
import {PostProp} from "./interfaces"
import { CreatePostComponent } from "./CreatePostComponent";
import {CreatePostCallback} from "./interfaces";
import {PostComponent} from "./PostComponent";

export const PostListComponent: React.FunctionComponent = () => {
    let [postArray, setPostArray] = useState<PostProp[]>([]);

    let callbackCreate : CreatePostCallback = (newPost) => {
        let nuovalista = postArray.concat(newPost);
        console.log(postArray);
        setPostArray(nuovalista);
    }

    return <>
        <CreatePostComponent callback={callbackCreate} />
        {postArray.map((item, index) => 
            <React.Fragment key={index}>
                <PostComponent titolo={item.titolo} contenuto={item.contenuto} data={item.data} autore={item.autore}/>
            </React.Fragment>
        )}
    </>
}