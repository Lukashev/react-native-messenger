export const redirect = (routeName, navigation) => () => {
    return navigation.navigate(routeName)
}