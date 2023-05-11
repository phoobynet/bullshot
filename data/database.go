package data

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func OpenDB() (*gorm.DB, error) {
	d, err := gorm.Open(sqlite.Open("bullshot.db"), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	return d, nil
}
