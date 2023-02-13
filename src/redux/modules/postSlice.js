import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostAPI } from "../api/axios";

const initialState = {
  isLoading: false,
  error: false,
  flag: 0,
  dataLength: 0,
  boolHelper: false,
  boolHelpee: false,
  boolHelpUs: false,
  boolAll: true,
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
  searchBool: false,
  postEnd: false,
};

export const __createPost = createAsyncThunk(
  "postSlice/createPost",
  async (formData, thunkAPI) => {
    try {
      const response = await PostAPI.postCreate(formData);
      console.log(response);
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      } else if (response.response.status === 400) {
        return thunkAPI.rejectWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue(response.data);
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
      const response = await PostAPI.postUpdate(payload.id, payload.data);
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.status);
      } else if (response.response.status === 400) {
        return thunkAPI.rejectWithValue(response.response.status);
      } else {
        return thunkAPI.rejectWithValue(response.response.status);
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
      if (res.status === 201) {
        window.alert("게시글이 삭제되었습니다");
        thunkAPI.fulfillWithValue(res.data);
        window.location.replace("/mypage");
      }
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
//    <  전체 false  >
export const __getAllFalse = createAsyncThunk(
  "mypageSlice/getAllFalse",
  async (payload, thunkAPI) => {
    if (payload.count === undefined) {
      return;
    }
    try {
      if (payload.input.length > 0) {
        const res = await PostAPI.getAllFalse(payload.count, payload.input);
        return thunkAPI.fulfillWithValue({
          result: res.data.result,
          input: payload.input,
        });
      } else {
        const res = await PostAPI.getAllFalse(
          payload.count,
          (payload.input = [])
        );
        return thunkAPI.fulfillWithValue({
          result: res.data.result,
          input: 0,
        });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬피 false  >
export const __getHelpeeFalse = createAsyncThunk(
  "mypageSlice/__getHelpeeFalse",
  async (payload, thunkAPI) => {
    if (payload.count === undefined) {
      return;
    }
    try {
      if (payload.input.length > 0) {
        const res = await PostAPI.getHelpeeFalse(payload.count, payload.input);

        return thunkAPI.fulfillWithValue({
          result: res.data.result,
          input: payload.input,
        });
      } else {
        const res = await PostAPI.getHelpeeFalse(
          payload.count,
          (payload.input = [])
        );

        return thunkAPI.fulfillWithValue({
          result: res.data.result,
          input: 0,
        });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬퍼 false  >
export const __getHelperFalse = createAsyncThunk(
  "mypageSlice/__getHelperFalse",
  async (payload, thunkAPI) => {
    if (payload.count === undefined) {
      return;
    }
    try {
      if (payload.input.length > 0) {
        const res = await PostAPI.getHelperFalse(payload.count, payload.input);

        return thunkAPI.fulfillWithValue({
          result: res.data.result,
          input: payload.input,
        });
      } else {
        const res = await PostAPI.getHelperFalse(
          payload.count,
          (payload.input = [])
        );

        return thunkAPI.fulfillWithValue({
          result: res.data.result,
          input: 0,
        });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬퍼스 false  >
export const __getHelpUsFalse = createAsyncThunk(
  "mypageSlice/__getHelpUsFalse",
  async (payload, thunkAPI) => {
    if (payload.count === undefined) {
      return;
    }
    try {
      if (payload.input.length > 0) {
        const res = await PostAPI.getHelpUsFalse(payload.count, payload.input);

        return thunkAPI.fulfillWithValue({
          result: res.data.result,
          input: payload.input,
        });
      } else {
        const res = await PostAPI.getHelpUsFalse(
          payload.count,
          (payload.input = [])
        );

        return thunkAPI.fulfillWithValue({
          result: res.data.result,
          input: 0,
        });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <<<<<<><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  로컬  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
//    <  전체 true  >
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

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    __setBollAll: (state) => {
      state.boolAll = true;
      state.boolHelper = false;
      state.boolHelpee = false;
      state.boolHelpUs = false;
    },
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
    __setPostEnd: (state, action) => {
      state.postEnd = action.payload;
      console.log("pay:", action.payload);
    },
  },
  extraReducers: {
    [__createPost.pending]: (state) => {},
    [__createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__createPost.rejected]: (state) => {},
    [__detailPost.pending]: (state) => {},
    [__detailPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postInfo = action.payload.result;
    },
    [__detailPost.rejected]: (state) => {},
    [__updatePost.pending]: (state) => {},
    [__updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__updatePost.rejected]: (state) => {},
    [__postZZim.pending]: (state) => {},
    [__postZZim.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ZZimMsg = action.payload;
    },
    [__postZZim.rejected]: (state) => {},
    [__deadLinePost.pending]: (state) => {},
    [__deadLinePost.fulfilled]: (state, action) => {
      state.deadLineMsg = action.payload;
    },
    [__deadLinePost.rejected]: (state) => {},

    //    <<<<  전체 false 가져오기  >>>>
    [__getAllFalse.fulfilled]: (state, action) => {
      const q = action.payload;
      if (q.input.length > 0) {
        state.AllFalseDate = q.result;
        state.searchBool = true;
      } else {
        if (state.searchBool === true) {
          state.AllFalseDate = [];
          state.searchBool = false;
        }
        state.AllFalseDate = [...state.AllFalseDate, ...q.result];
        if (q.result.length === 0) {
          state.postEnd = true;
        }
      }
    },
    [__getAllFalse.rejected]: (state) => {
      state.isLoading = true;
    },

    //    <  헬피 false 가져오기  >
    [__getHelpeeFalse.pending]: (state) => {},
    [__getHelpeeFalse.fulfilled]: (state, action) => {
      const q = action.payload;
      //검색시 실행
      if (q.input.length > 0) {
        state.helpeeFalseDate = q.result;
        state.searchBool = true;
      }
      //일반 조회
      else {
        if (state.searchBool === true) {
          state.helpeeFalseDate = [];
          state.searchBool = false;
        }
        state.helpeeFalseDate = [...state.helpeeFalseDate, ...q.result];
        console.log("helper:", state.helpeeFalseDate);

        if (q.result.length === 0) {
          state.postEnd = true;
        }
      }
    },
    [__getHelpeeFalse.rejected]: (state) => {},
    //    <  헬퍼 false 가져오기  >
    [__getHelperFalse.pending]: (state) => {},
    [__getHelperFalse.fulfilled]: (state, action) => {
      const q = action.payload;
      //검색시 실행
      if (q.input.length > 0) {
        state.helperFalseDate = q.result;
        state.searchBool = true;
      }
      //일반 조회
      else {
        if (state.searchBool === true) {
          state.helperFalseDate = [];
          state.searchBool = false;
        }
        state.helperFalseDate = [...state.helperFalseDate, ...q.result];
        console.log("helper:", state.helperFalseDate);

        if (q.result.length === 0) {
          state.postEnd = true;
        }
      }
    },
    [__getHelperFalse.rejected]: (state) => {},
    //    <  헬퍼스 false 가져오기  >
    [__getHelpUsFalse.pending]: (state) => {},
    [__getHelpUsFalse.fulfilled]: (state, action) => {
      const q = action.payload;
      //검색시 실행
      if (q.input.length > 0) {
        state.helpUsFalseDate = q.result;
        state.searchBool = true;
      }
      //일반 조회
      else {
        if (state.searchBool === true) {
          state.helpUsFalseDate = [];
          state.searchBool = false;
        }
        state.helpUsFalseDate = [...state.helpUsFalseDate, ...q.result];
        if (q.result.length === 0) {
          state.postEnd = true;
        }
      }
    },
    [__getHelpUsFalse.rejected]: (state) => {},
    //    <<<<  전체 true 가져오기  >>>>
    [__getAllTrue.pending]: (state) => {},
    [__getAllTrue.fulfilled]: (state, action) => {
      state.AllTrueDate = action.payload;
    },
    [__getAllTrue.rejected]: (state) => {},
    //    <  헬피 true 가져오기  >
    [__getHelpeeTrue.pending]: (state) => {},
    [__getHelpeeTrue.fulfilled]: (state, action) => {
      state.helpeeTrueDate = action.payload;
    },
    [__getHelpeeTrue.rejected]: (state) => {},
    //    <  헬퍼 true 가져오기  >
    [__getHelperTrue.pending]: (state) => {},
    [__getHelperTrue.fulfilled]: (state, action) => {
      state.helperTrueDate = action.payload;
    },
    [__getHelperTrue.rejected]: (state) => {},
    //    <  헬퍼스 true 가져오기  >
    [__getHelpUsTrue.pending]: (state) => {},
    [__getHelpUsTrue.fulfilled]: (state, action) => {
      state.helpUsTrueDate = action.payload;
    },
    [__getHelpUsTrue.rejected]: (state, action) => {},
  },
});
export const {
  __setBollAll,
  __setBoolHelper,
  __setBoolHelpee,
  __setBoolHelpUs,
  __setBoolLocationTrue,
  __setBoolLocationFalse,
  __giveInput,
  __setPostEnd,
} = postSlice.actions;
export default postSlice.reducer;
