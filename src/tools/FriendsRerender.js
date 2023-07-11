const FriendsRerender = (NumberFriends, friendsCord) => {
    const weight = friendsCord[2]
    const height = friendsCord[3]

    const Users = (nRow, nCol, sizeAvatar, friendsCord) => {
        const Mass = []
        //const nRow = 2
        //const nCol = 7
        const PxLeft = Math.floor((friendsCord[2] - (nCol*sizeAvatar)) * 0.5)
        const leftIndent = PxLeft >= 0 ? PxLeft : 0

        const PxTop = Math.floor((friendsCord[3] - nRow*sizeAvatar) * 0.5)
        const topIndent = PxTop >= 0 ? PxTop : 0
        for (let i = 0; i < nRow; i++) {
            for (let j = 0; j < nCol; j++) {
                Mass.push([
                    friendsCord[0] + (sizeAvatar*j) + leftIndent,
                    friendsCord[1] + (sizeAvatar*i) + topIndent,
                    sizeAvatar, sizeAvatar
                ])
            }
        }
        return Mass
    }

    if (NumberFriends <= 7) {

        return Users(1, NumberFriends, weight/NumberFriends, friendsCord)

    } else if (NumberFriends <= 14) {

        return Users(2, 7, height/2, friendsCord)

    } else if (NumberFriends <= 22) {

        return Users(2,
            Math.ceil(NumberFriends/2),
            Math.floor(weight/Math.ceil(NumberFriends/2)),
            friendsCord)

    } else if (NumberFriends <= 33) {

        return Users(3, 11, height/3, friendsCord)

    } else if (NumberFriends <= 42) {

        return Users(3,
            Math.ceil(NumberFriends/3),
            Math.floor(weight/Math.ceil(NumberFriends/3)),
            friendsCord)

    } else if (NumberFriends <= 45) {

        return Users(3, 15, height/4.1, friendsCord)

    }
    else if (NumberFriends <= 60) {

        return Users(4, 15, height/4.1, friendsCord)

    } else if (NumberFriends <= 76) {

        return Users(4,
            Math.ceil(NumberFriends/4),
            Math.floor(weight/Math.ceil(NumberFriends/4)),
            friendsCord)

    } else if (NumberFriends <= 95) {

        return Users(5, 19, 35, friendsCord)

    } else if (NumberFriends <= 110) {

        return Users(5,
            Math.ceil(NumberFriends/5),
            Math.floor(weight/Math.ceil(NumberFriends/5)),
            friendsCord)

    } else if (NumberFriends <= 132) {

        return Users(6, 22, 30, friendsCord)

    } else if (NumberFriends <= 150) {

        return Users(6,
            Math.ceil(NumberFriends/6),
            Math.floor(weight/Math.ceil(NumberFriends/6)),
            friendsCord)

    } else if (NumberFriends <= 182) {

        return Users(7, 26, 25, friendsCord)

    } else if (NumberFriends <= 210) {

        return Users(7,
            Math.ceil(NumberFriends/7),
            Math.floor(weight/Math.ceil(NumberFriends/7)),
            friendsCord)

    } else if (NumberFriends <= 240) {

        return Users(8, 30, 22.3, friendsCord)

    } else if (NumberFriends <= 264) {

        return Users(8,
            Math.ceil(NumberFriends/8),
            Math.floor(weight/Math.ceil(NumberFriends/8)),
            friendsCord)

    } else if (NumberFriends <= 306) {

        return Users(9, 34, 19.7, friendsCord)

    } else if (NumberFriends <= 333) {

        return Users(9,
            Math.ceil(NumberFriends/9),
            Math.floor(weight/Math.ceil(NumberFriends/9)),
            friendsCord)

    } else if (NumberFriends <= 370) {

        return Users(10, 37, 18, friendsCord)

    } else if (NumberFriends > 370) {
        console.log('User list is VERY big, render users canceled')
        return 'User list is VERY big, render users canceled';
    }
}
export default FriendsRerender