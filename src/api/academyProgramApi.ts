import { baseApi } from "./baseApi";

const BASE_URL = "/academy-programs";

export interface AcademyProgram {
  id: string;
  name: string;
  description?: string;
  type: "P0" | "P1" | "P2" | "P3";
  duration: "MONTHLY" | "SEASONAL";
  price: number;
  programId: string;
  academyId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isSignUpFee: boolean;
  creditPoints?: number;
  condition?: string;
  discountRules?: any;
  discountAmount?: number;
  latePaymentFees?: number;
  dueDate?: string;
  stripeProgramId?: string;
  createdAt: string;
  updatedAt: string;
  studentSubscriptions?: {
    id: string;
    status: string;
    user: {
      id: string;
      profile: {
        firstName: string;
        lastName: string;
      };
    };
  }[];
}

export const academyProgramApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAcademyPrograms: builder.query<AcademyProgram[], string>({
      query: (academyId) => `${BASE_URL}/academy/${academyId}`,
      providesTags: ["AcademyPrograms"],
    }),

    fetchProgramById: builder.query<AcademyProgram, string>({
      query: (id) => `${BASE_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "AcademyPrograms", id }],
    }),
  }),
});

export const { useFetchAcademyProgramsQuery, useFetchProgramByIdQuery } =
  academyProgramApi;
