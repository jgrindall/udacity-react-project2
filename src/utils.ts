
function rnd(): string{
    return  Math.random().toString(36).substring(2, 15);
}

export function generateUID ():string {
    return rnd() + rnd();
}

//https://www.codementor.io/@sahilmittal/using-higher-order-components-for-authenticated-routing-i1hcp6pc6
