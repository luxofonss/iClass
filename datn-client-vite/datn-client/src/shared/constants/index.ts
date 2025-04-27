export const HEADER = {
	API_KEY: "x-api-key",
	CLIENT_ID: "x-client-id",
	AUTHORIZATION: "authorization",
};

export const ROLE = {
	STUDENT: "USER",
	TEACHER: "TEACHER",
	ADMIN: "ADMIN",
};

export const COURSE_VIEW_MODE = {
	TEACHER: "TEACHER",
	NOT_ENROLLED: "NOT_ENROLLED",
	ENROLLED: "ENROLLED",
	INACTIVE: "INACTIVE",
};

export const IMAGE =
	"https://images-platform.99static.com//VJULhRua27I6my6XqmWDTIUqCa4=/46x2045:959x2958/fit-in/500x500/99designs-contests-attachments/79/79121/attachment_79121110";

export const AVATAR =
	"https://techcrunch.com/wp-content/uploads/2015/12/screen-shot-2013-06-26-at-5-04-13-pm.png";

export const AVATAR_2 =
	"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1698969600&semt=ais";

export const COLOR = {
	CORE: {
		BLUE: "#2A85FF",
		GREEN: "#83BF6E",
		RED: "#FF6A55",
		VIOLET: "#8E59FF",
	},
	SECONDARY: {
		ORANGE: "#FFBC99",
		VIOLET: "#CABDFF",
		BLUE: "#B1E5FC",
		GREEN: "#B5E4CA",
		YELLOW: "#FFD88D",
	},
};

export const QUESTION_TYPE_ENUM = {
	SINGLE_CHOICE: "SINGLE_CHOICE",
	MULTI_CHOICE: "MULTIPLE_CHOICES",
	SHORT_ANSWER: "SHORT_ANSWER",
	LONG_ANSWER: "LONG_ANSWER",
};

export const QUESTION_TYPE = [
	{
		value: QUESTION_TYPE_ENUM.SINGLE_CHOICE,
		label: "Chọn 1 đáp án",
	},
	{
		value: QUESTION_TYPE_ENUM.MULTI_CHOICE,
		label: "Chọn nhiều đáp án",
	},
	{
		value: QUESTION_TYPE_ENUM.SHORT_ANSWER,
		label: "Điền từ",
	},
	{
		value: QUESTION_TYPE_ENUM.LONG_ANSWER,
		label: "Viết đoạn văn",
	},
];

export const TIME_OPTIONS = [
	{
		value: "free",
		label: "Không giới hạn",
	},
	{
		value: "custom",
		label: "Tùy chỉnh",
	},
];

export const QUESTION_INDEX = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
];

export const SUBJECT_OPTIONS = [
	{
		value: "39d6e7e7-1536-4bf3-aabe-194e57843324",
		label: "Tiếng Anh",
	},
	{
		value: "93f4e7d3-e340-406e-9ea5-b3481a5a75e1",
		label: "Tiếng Nhật",
	},
	{
		value: "6523ef2a-a0bd-47b1-8d53-4e1ae2049780",
		label: "Tiếng Hàn",
	},
	{
		value: "2e4653e2-3499-48ab-8c7b-b2cf0056ea54",
		label: "Tiếng Pháp",
	},
	{
		value: "f777a198-94ad-44dd-86bf-b1cd20950d3b",
		label: "IELTS",
	},
	{
		value: "624b9c61-4149-42cc-a226-69644606e925",
		label: "TOEIC",
	},
	{
		value: "d87bf7ca-f6ce-4822-8ad3-303b6a1b3b06",
		label: "Khác",
	},
];

export const COURSE_LEVEL_OPS = [
	{
		value: "BEGINNER",
		label: "Người mới bắt đầu",
	},
	{
		value: "ELEMENTARY",
		label: "Tiểu học",
	},
	{
		value: "INTERMEDIATE",
		label: "Trung học",
	},
	{
		value: "UPPER_INTERMEDIATE",
		label: "Trung học phổ thông",
	},
	{
		value: "ADVANCED",
		label: "Nâng cao",
	},
	{
		value: "PROFICIENCY",
		label: "Chuyên gia",
	},
];

export const COURSE_INFO_TYPES = {
	INTEND: {
		type: "INTEND",
		label: "Intend",
	},
	REQUIREMENT: {
		type: "REQUIREMENT",
		label: "Requirement",
	},
	WHO: {
		type: "WHO",
		label: "Who is this course for?",
	},
	WELCOME_MSG: {
		type: "WELCOME_MSG",
		label: "Welcome message",
	},
	CONGRAT_MSG: {
		type: "CONGRAT_MSG",
		label: "Congratulation message",
	},
};

export const ASSIGNMENT_TYPE = {
	MID: {
		value: "mid",
		label: "Kiểm tra giữa khóa",
	},
	FINAL: {
		value: "final",
		label: "Kiểm tra cuối khóa",
	},
	HOME_WORK: {
		value: "home-work",
		label: "Bài tập",
	},
	OTHER: {
		value: "other",
		label: "Khác",
	},
};

export const ASSIGNMENT_ATTEMPT_TYPE = {
	SINGLE: {
		value: false,
		label: "Single attempt",
	},
	MULTIPLE: {
		value: true,
		label: "Multiple attempt",
	},
};

export const QUESTION_LEVEL = {
	EASY: {
		value: "EASY",
		label: "Dễ",
	},
	MEDIUM: {
		value: "MEDIUM",
		label: "Trung bình",
	},
	HARD: {
		value: "HARD",
		label: "Khó",
	},
};
