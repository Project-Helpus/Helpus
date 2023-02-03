import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostAPI } from "../../api/axios";

export const __createPost = createAsyncThunk(
  "postSlice/createPost",
  async (formData, thunkAPI) => {
    try {
      const response = await PostAPI.postCreate(formData);
      if (response.status === 201) {
        window.alert("게시물이 생성 되었습니다.");
        return thunkAPI.fulfillWithValue();
      } else {
        window.alert("다시 시도해 주세요.");
        return thunkAPI.rejectWithValue();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const __updatePost = createAsyncThunk(
  "postSlice/updatePost",
  async (payload, thunkAPI) => {
    try {
      const Id = payload.id;
      const data = payload.data;
      const res = await PostAPI.postUpdate(Id, data);
      if (res.status === 201) {
        window.alert("수정이 완료되었습니다");
        thunkAPI.fulfillWithValue(res.data);
        return window.location.replace("/mypage");
      }
    } catch (err) {
      window.alert("수정 실패");
      return thunkAPI.rejectWithValue();
    }
  }
);
export const __deletePost = createAsyncThunk(
  "postSlice/deletePost",
  async (id, thunkAPI) => {
    try {
      const res = await PostAPI.deletePost(id);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const __postZZim = createAsyncThunk(
  "postSlice/postZZim",
  async (id, thunkAPI) => {
    try {
      const res = await PostAPI.postZZim(id);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __detailPost = createAsyncThunk(
  "postSlice/detailPost",
  async (postId, thunkAPI) => {
    try {
      const response = await PostAPI.getDetailPost(postId);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const __deadLinePost = createAsyncThunk(
  "mypageSlice/deadLinePost",
  async (payload, thunkAPI) => {
    try {
      const Id = payload.id;
      const isDeadLine = payload.isDeadLine;
      const res = await PostAPI.postDeadLine(Id, isDeadLine);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <<<<<<  전국  >>>>>>
//    <  전국 false  >
// export const __getAllFalse = createAsyncThunk(
//   "mypageSlice/getAllFalse",
//   async (count, thunkAPI) => {
//     try {
//       const searchValue = thunkAPI.getState().postSlice.inputReciver;
//       const res = await PostAPI.getAllFalse(count, searchValue);
//       return thunkAPI.fulfillWithValue(res.data.result);
//     } catch (err) {
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );
export const __getAllFalse = createAsyncThunk(
  "mypageSlice/getAllFalse",
  async (payload, thunkAPI) => {
    try {
      const searchValue = thunkAPI.getState().postSlice.inputReciver;
      const res = await PostAPI.getAllFalse(searchValue);
      return thunkAPI.fulfillWithValue(res.data.result);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬피 false  >
export const __getHelpeeFalse = createAsyncThunk(
  "mypageSlice/__getHelpeeFalse",
  async (payload, thunkAPI) => {
    try {
      const searchValue = thunkAPI.getState().postSlice.inputReciver;
      const res = await PostAPI.getHelpeeFalse(searchValue);

      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬퍼 false  >
export const __getHelperFalse = createAsyncThunk(
  "mypageSlice/__getHelperFalse",
  async (payload, thunkAPI) => {
    try {
      const searchValue = thunkAPI.getState().postSlice.inputReciver;
      const res = await PostAPI.getHelperFalse(searchValue);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬퍼스 false  >
export const __getHelpUsFalse = createAsyncThunk(
  "mypageSlice/__getHelpUsFalse",
  async (payload, thunkAPI) => {
    try {
      const searchValue = thunkAPI.getState().postSlice.inputReciver;
      const res = await PostAPI.getHelpUsFalse(searchValue);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <<<<<<><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  로컬  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
//    <  전체 게시물 true  >
export const __getAllTrue = createAsyncThunk(
  "mypageSlice/getAllTrue",
  async (payload, thunkAPI) => {
    try {
      const searchValue = thunkAPI.getState().postSlice.inputReciver;
      const res = await PostAPI.getAllTrue(searchValue);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬피 true  >
export const __getHelpeeTrue = createAsyncThunk(
  "mypageSlice/__getHelpeeTrue",
  async (payload, thunkAPI) => {
    try {
      const searchValue = thunkAPI.getState().postSlice.inputReciver;
      const res = await PostAPI.getHelpeeTrue(searchValue);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬퍼 true  >
export const __getHelperTrue = createAsyncThunk(
  "mypageSlice/__getHelperTrue",
  async (payload, thunkAPI) => {
    try {
      const searchValue = thunkAPI.getState().postSlice.inputReciver;
      const res = await PostAPI.getHelperTrue(searchValue);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬퍼스 true  >
export const __getHelpUsTrue = createAsyncThunk(
  "mypageSlice/__getHelpUsTrue",
  async (payload, thunkAPI) => {
    try {
      const searchValue = thunkAPI.getState().postSlice.inputReciver;
      const res = await PostAPI.getHelpUsTrue(searchValue);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  isLoading: false,
  error: false,
  flag: 0,
  dataLength: 0,
  boolHelper: false,
  boolHelpee: false,
  boolHelpUs: false,
  boolAll: false,
  boolLocation: false,
  AllFalseDate: [],
  helpeeFalseDate: [],
  helperFalseDate: [],
  helpUsFalseDate: [],
  AllTrueDate: [],
  helpeeTrueDate: [],
  helperTrueDate: [],
  helpUsTrueDate: [],
  inputReciver: "",
  postInfo: "",
  ZZimMsg: [],
  deadLineMsg: "",
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    __setBoolHelper: (state) => {
      state.boolHelper = true;
      state.boolHelpee = false;
      state.boolHelpUs = false;
      state.boolAll = false;
    },
    __setBoolHelpee: (state) => {
      state.boolHelpee = true;
      state.boolHelper = false;
      state.boolHelpUs = false;
      state.boolAll = false;
    },
    __setBoolHelpUs: (state) => {
      state.boolHelpUs = true;
      state.boolHelpee = false;
      state.boolHelper = false;
      state.boolAll = false;
    },
    __setBoolLocationTrue: (state) => {
      state.boolLocation = true;
    },
    __setBoolLocationFalse: (state) => {
      state.boolLocation = false;
    },
    __giveInput: (state, action) => {
      state.inputReciver = action.payload;
    },
  },
  extraReducers: {
    [__createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__createPost.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [__detailPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__detailPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postInfo = action.payload.result;
    },
    [__detailPost.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [__updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postInfo = action.payload.result;
    },
    [__updatePost.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [__postZZim.pending]: (state) => {
      state.isLoading = true;
    },
    [__postZZim.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ZZimMsg = action.payload;
    },
    [__postZZim.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [__deadLinePost.pending]: (state) => {},
    [__deadLinePost.fulfilled]: (state, action) => {
      state.deadLineMsg = action.payload;
    },
    [__deadLinePost.rejected]: (state) => {
      state.error = true;
    },

    //    <<<<  전체 false 가져오기  >>>>
    [__getAllFalse.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAllFalse.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.dataLength = action.payload.length;
      // if (state.dataLength !== 0) {
      //   state.AllFalseDate = [...state.AllFalseDate, ...action.payload];
      // }
      state.AllFalseDate = action.payload;
    },
    [__getAllFalse.rejected]: (state, action) => {
      state.isLoading = true;
    },

    //    <  헬피 false 가져오기  >
    [__getHelpeeFalse.pending]: (state) => {},
    [__getHelpeeFalse.fulfilled]: (state, action) => {
      state.helpeeFalseDate = action.payload;
    },
    [__getHelpeeFalse.rejected]: (state, action) => {},
    //    <  헬퍼 false 가져오기  >
    [__getHelperFalse.pending]: (state) => {},
    [__getHelperFalse.fulfilled]: (state, action) => {
      state.helperFalseDate = action.payload;
    },
    [__getHelperFalse.rejected]: (state, action) => {},
    //    <  헬퍼스 false 가져오기  >
    [__getHelpUsFalse.pending]: (state) => {},
    [__getHelpUsFalse.fulfilled]: (state, action) => {
      state.helpUsFalseDate = action.payload;
    },
    [__getHelpUsFalse.rejected]: (state, action) => {},
    //    <<<<  전체 true 가져오기  >>>>
    [__getAllTrue.pending]: (state) => {},
    [__getAllTrue.fulfilled]: (state, action) => {
      state.AllTrueDate = action.payload;
    },
    [__getAllTrue.rejected]: (state, action) => {},
    //    <  헬피 true 가져오기  >
    [__getHelpeeTrue.pending]: (state) => {},
    [__getHelpeeTrue.fulfilled]: (state, action) => {
      state.helpeeTrueDate = action.payload;
    },
    [__getHelpeeTrue.rejected]: (state, action) => {},
    //    <  헬퍼 true 가져오기  >
    [__getHelperTrue.pending]: (state) => {},
    [__getHelperTrue.fulfilled]: (state, action) => {
      state.helperTrueDate = action.payload;
    },
    [__getHelperTrue.rejected]: (state, action) => {},
    //    <  헬퍼스 true 가져오기  >
    [__getHelpUsTrue.pending]: (state) => {},
    [__getHelpUsTrue.fulfilled]: (state, action) => {
      state.helpUsTrueDate = action.payload;
    },
    [__getHelpUsTrue.rejected]: (state, action) => {},
  },
});
export const {
  __setBoolHelper,
  __setBoolHelpee,
  __setBoolHelpUs,
  __setBoolLocationTrue,
  __setBoolLocationFalse,
  __giveInput,
} = postSlice.actions;
export default postSlice.reducer;
