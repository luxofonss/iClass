package userrepository

type RegisterUserStore interface {
	FindUser(ctx context.Context, conditions map[string]interface{}, moreInfo ...string) (*usermodel.User, error)
	CreateUser(ctx context.Context, data *usermodel.UserCreate) error
}

type Hasher interface {
	Hash(data string) string
}

type RegisterRepo struct {
	store  RegisterUserStore
	hasher Hasher
}

func NewRegisterRepo(store RegisterUserStore, hasher Hasher) *RegisterRepo {
	return &RegisterRepo{store: store, hasher: hasher}
}

func (repo *RegisterRepo) Register(ctx context.Context, data *usermodel.UserCreate) error {
	user, _ := repo.store.FindUser(ctx, map[string]interface{}{"email": data.Email})

	if user != nil {
		//if user.Status ==0 {
		//
		//}
		return usermodel.ErrEmailExisted
	}

	salt := common.GenSalt(50)

	data.Password = repo.hasher.Hash(data.Password + salt)
	data.Salt = salt
	data.Role = "user"
	data.Status = 1

	if err := repo.store.CreateUser(ctx, data); err != nil {
		return common.ErrCannotCreateEntity(usermodel.EntityName, err)
	}

	return nil
}
