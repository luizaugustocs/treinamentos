import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const AlbumDetail = ({ album }) => {
    const { title, artist, thumbnail_image, image, url } = album;
    const { thumbnailContainer, textContainer, thumbnailImage, albumTitle, albumImage } = styles;
    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainer}>
                    <Image style={thumbnailImage} source={{ uri: thumbnail_image }} />
                </View>
                <View style={textContainer}>
                    <Text style={albumTitle}>{title}</Text>
                    <Text>{artist}</Text>
                </View>
            </CardSection>
            <CardSection>
                <Image style={albumImage} source={{ uri: image }} />
            </CardSection>
            <CardSection>
                <Button onClick={() => Linking.openURL(url)} >
                    Buy
                </Button>
            </CardSection>
        </Card>
    );
};

const styles = {
    textContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    thumbnailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    thumbnailImage: {
        height: 50,
        width: 50
    },
    albumTitle: {
        fontSize: 18
    },
    albumImage: {
        flex: 1,
        width: null,
        height: 300
    }
};

export default AlbumDetail;
