export const mutations = `#graphql
    createProfile(
        fatherName: String!
        cnic: String!
        address: String!
        phone: String!
        emergencyContact: String!
        bloodGroup: String!
        userId: String!
        cnicFront: String!
        cnicBack: String!
        userType: String!
        image: String!
    ): Profile
    updateProfile(
        fatherName: String!
        cnic: String!
        address: String!
        phone: String!
        emergencyContact: String!
        bloodGroup: String!
        userId: String!
        cnicFront: String!
        cnicBack: String!
        userType: String!
        image: String!) : Profile
    deleteProfile(id:ID!):String
`;
