export const stall = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
};
