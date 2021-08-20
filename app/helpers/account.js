export function getType(account){
    return account.type === 'fop' ? 'business' : 'personal';
}
